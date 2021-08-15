<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\OrderMail;
use App\Models\Log;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductPromotion;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use JWTAuth;

class OrderController extends Controller
{

    public function sendMailOrder($invoice)
    {
        $order = Order::where('orders.invoice', $invoice)->join('users as u', 'u.id', '=', 'orders.user_id')->select('orders.*', 'u.email')->first();
        $products = $order->productOrder()->join('products as p', 'p.id', '=', 'product_orders.product_id')->select('p.*', 'product_orders.unitary_value as value_sended', 'product_orders.quantity as quantity_sended')->get();
        Mail::send(new OrderMail($order, $products, $order->email));
    }
    public function store(Request $request)
    {
        $invoice = uniqid();
        $data = $request->all();
        $user_jwt = JWTAuth::toUser();

        try {
            DB::beginTransaction();
            $address = $user_jwt->address()->where('id', $data['address_id'])->first();
            $card = $user_jwt->card()->where('id', $data['card_id'])->first();

            $response_request_card = Http::asForm()->withHeaders([
                'Authorization' => 'Bearer ' . config('app.stripe_token')
            ])
            ->post('https://api.stripe.com/v1/tokens', [
                'card[number]' => $card->number,
                'card[exp_month]' => explode('/', $card->expiration_date)[0],
                'card[exp_year]' => explode('/', $card->expiration_date)[1],
                'card[cvc]' => $card->security_code
            ])->json();

            if(isset($response_request_card['error'])){
                throw new Exception("Falha ao tokenizar cartão.");
            }

            $card_token = $response_request_card['id'];
            $card->update(['card_token' => $card_token]);

            $order = $user_jwt->order()->create([
                'quantity' => count($data['products']),
                'value_total' => 0,
                'invoice' => $invoice,
                'status_order' => 1,
                'estimated_date' => $data['send_estimated_date'],
                'payment_method_id' => 1,
                'card_id' => $card->id,
                'address_id' => $address->id
            ]);

            $items = [];
            $total_value = $data['send_value'] ?? 0;
            foreach ($data['products'] as $product) {
                $product_info = Product::find($product['id']);

                if ($product_info->quantity == 0) {
                    throw new Exception("Produto indisponível.");
                }

                $product_promotion = ProductPromotion::where('product_id', $product['id'])
                    ->join('promotions as p', 'p.id', '=', 'product_promotions.promotion_id')
                    ->first();

                if (!is_null($product_promotion)) {
                    $product_with_promotion = $product_promotion->type == 1 ?
                        ($product_info->unitary_value - $product_promotion->value) :
                        $product_info->unitary_value - ($product_info->unitary_value * ($product_promotion->value / 100));
                }

                $total_product = (isset($product_with_promotion) ? $product_with_promotion : $product_info->unitary_value) * $product['quantity'];

                $order->productOrder()->create([
                    'product_id' => $product['id'],
                    'quantity' => $product['quantity'],
                    'unitary_value' => $total_product
                ]);

                $product_info->decrement('quantity', $product['quantity']);

                $total_value += $total_product;

                array_push($items, ['type' => 'sku', 'parent' => $product_info->stripe_sku_id, 'quantity' => $product['quantity']]);
            }

            $response_request_create_order = Http::asForm()->withHeaders([
                'Authorization' => 'Bearer ' . config('app.stripe_token')
            ])
            ->post('https://api.stripe.com/v1/orders', [
                'currency' => 'BRL',
                'items' => $items,
                'shipping[name]' => $user_jwt->name,
                'shipping[address][line1]' => $address->public_place,
                'shipping[address][city]' => $address->city,
                'shipping[address][state]' => $address->state,
                'shipping[address][country]' => 'Brasil',
                'shipping[address][postal_code]' => $address->zip_code
            ])->json();

            if(isset($response_request_create_order['error'])){
                throw new Exception('Venda não criada na stripe');
            }

            $response_request_pay_order = Http::asForm()->withHeaders([
                'Authorization' => 'Bearer ' . config('app.stripe_token')
            ])
            ->post('https://api.stripe.com/v1/orders/' . $response_request_create_order['id'] . '/pay', [
                'source' => $card_token,
                'email' => $user_jwt->email
            ])->json();

            if(isset($response_request_pay_order['error'])){
                throw new Exception('Cartão de crédito negado.');
            }

            $order->update(['value_total' => $total_value, 'status_order' => ($response_request_pay_order['status'] == 'paid' ? 3 : 4), 'stripe_order_id' => $response_request_create_order['id']]);

            Log::create([
                'type' => 'order',
                'information' => 'create order and pay - SUCCESS',
                'data' => json_encode([$data ?? null, $address ?? null, $card ?? null, $order ?? null, $items ?? null, $total_value ?? null, $response_request_create_order ?? null, $response_request_pay_order ?? null])
            ]);
            $this->sendMailOrder($order->invoice);
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            $error = ['code' => 2, 'error_message' => $exception->getMessage() ?? 'Não foi possivel realizar a venda.'];
            Log::create([
                'type' => 'order',
                'information' => 'create order and pay - ERROR',
                'data' => $exception->getMessage()
            ]);
        }

        if (isset($order) && !isset($error)) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function show()
    {
        try {

            $orders = Order
                ::join('users as u', 'u.id', '=', 'orders.user_id')
                ->join('payment_methods as pm', 'pm.id', '=', 'orders.payment_method_id')
                ->orderBy('orders.created_at', 'desc')
                ->select(
                    'orders.invoice',
                    'orders.quantity',
                    'orders.value_total',
                    'orders.status_order',
                    'orders.created_at',
                    'u.name as name_user',
                )->get();
            $mounted_orders_data = [];
            foreach ($orders as $order) {
                array_push($mounted_orders_data, array(
                    'invoice' => $order->invoice,
                    'quantity' => $order->quantity,
                    'value_total' => $order->value_total,
                    'status_order' => $order->status_order,
                    'name_user' => $order->name_user,
                    'selled_date' => Carbon::parse($order->created_at)->format('Y-m-d'),
                ));
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar as vendas.'];
        }

        if (isset($mounted_orders_data) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_orders_data, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function get($invoice)
    {
        try {

            $order = Order::where('orders.invoice', $invoice)
                ->join('users as u', 'u.id', '=', 'orders.user_id')
                ->join('payment_methods as pm', 'pm.id', '=', 'orders.payment_method_id')
                ->join('addresses as a', 'a.id', '=', 'orders.address_id')
                ->select(
                    'orders.id',
                    'orders.quantity',
                    'orders.value_total',
                    'orders.invoice',
                    'orders.status_order',
                    'orders.shipped_date',
                    'orders.estimated_date',
                    'orders.tracking_code',
                    'orders.finished_date',
                    'orders.created_at',
                    'u.name as name_user',
                    'pm.name as payment_method',
                    'a.public_place',
                    'a.district',
                    'a.number',
                    'a.complement',
                    'a.zip_code',
                    'a.city',
                    'a.state',
                    'a.reference_point'
                )->first();
            if (!empty($order)) {
                $products = $order->productOrder()
                    ->join('products as p', 'p.id', '=', 'product_orders.product_id')
                    ->select('product_orders.*', 'p.name', 'p.unitary_value as unitary_value_product')
                    ->get();
                $mounted_products_data = [];
                $value_total_products = 0;
                foreach ($products as $product) {
                    array_push($mounted_products_data, array(
                        'name' => $product->name,
                        'unitary_value_product' => $product->unitary_value_product,
                        'quantity' => $product->quantity,
                        'unitary_value_selled' => $product->unitary_value
                    ));
                    $value_total_products += $product->unitary_value * $product->quantity;
                }

                $mounted_orders_data = array(
                    'id' => $order->id,
                    'invoice' => $order->invoice,
                    'selled_date' => Carbon::parse($order->created_at)->format('Y-m-d'),
                    'value_total_products' => (float) number_format($value_total_products, 2, '.', ''),
                    'value_shipping' => (float) number_format((number_format($order->value_total, 2, '.', '') - number_format($value_total_products, 2, '.', '')), 2, '.', ''),
                    'value_total' => (float) number_format($order->value_total, 2, '.', ''),
                    'quantity' => $order->quantity,
                    'status_order' => $order->status_order,
                    'send_method' => $order->send_method,
                    'tracking_code' => $order->tracking_code,
                    'shipped_date' => $order->shipped_date,
                    'estimated_date' => $order->estimated_date,
                    'finished_date' => $order->finished_date,
                    'name_user' => $order->name_user,
                    'address' => array(
                        'public_place' => $order->public_place,
                        'district' => $order->district,
                        'number' => $order->number,
                        'complement' => $order->complement,
                        'zip_code' => $order->zip_code,
                        'city' => $order->city,
                        'state' => $order->state,
                        'reference_point' => $order->reference_point
                    ),
                    'payment_method' => $order->payment_method,
                    'products' => $mounted_products_data
                );
            } else {
                $error = ['code' => 2, 'error_message' => 'Não foi possivel listar a venda.'];
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar a venda.'];
        }

        if (isset($mounted_orders_data) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_orders_data, 'error' => $error ?? null], 200);
        }
        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function showWithUser()
    {
        $user_jwt = JWTAuth::toUser();

        try {

            $orders = $user_jwt->order()
                ->join('cards as c', 'c.id', '=', 'orders.card_id')
                ->orderBy('orders.created_at', 'desc')
                ->select(
                    'orders.invoice',
                    'orders.quantity',
                    'orders.value_total',
                    'orders.status_order',
                    'orders.created_at',
                    'c.number',
                    'c.flag'
                )->get();
            $mounted_orders_data = [];
            foreach ($orders as $order) {
                array_push($mounted_orders_data, array(
                    'invoice' => $order->invoice,
                    'quantity' => $order->quantity,
                    'value_total' => $order->value_total,
                    'status_order' => $order->status_order,
                    'selled_date' => Carbon::parse($order->created_at)->format('Y-m-d'),
                    'card' => [substr_replace($order->number, '***********', 0, 11), $order->flag]
                ));
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar os pedidos.'];
        }

        if (isset($mounted_orders_data) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_orders_data, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function getWithUser($invoice)
    {
        $user_jwt = JWTAuth::toUser();

        try {

            $order = $user_jwt->order()->where('orders.invoice', $invoice)
                ->join('users as u', 'u.id', '=', 'orders.user_id')
                ->join('payment_methods as pm', 'pm.id', '=', 'orders.payment_method_id')
                ->join('cards as c', 'c.id', '=', 'orders.card_id')
                ->join('addresses as a', 'a.id', '=', 'orders.address_id')
                ->select(
                    'orders.id',
                    'orders.quantity',
                    'orders.value_total',
                    'orders.invoice',
                    'orders.status_order',
                    'orders.shipped_date',
                    'orders.estimated_date',
                    'orders.tracking_code',
                    'orders.finished_date',
                    'orders.created_at',
                    'pm.name as payment_method',
                    'a.public_place',
                    'a.district',
                    'a.number',
                    'a.complement',
                    'a.zip_code',
                    'a.city',
                    'a.state',
                    'a.reference_point',
                    'c.number',
                    'c.flag'
                )->first();
            if (!empty($order)) {
                $products = $order->productOrder()
                    ->join('products as p', 'p.id', '=', 'product_orders.product_id')
                    ->select('product_orders.*', 'p.name', 'p.unitary_value as unitary_value_product', 'p.image', 'p.mime_type')
                    ->get();
                $mounted_products_data = [];
                $value_total_products = 0;
                foreach ($products as $product) {
                    array_push($mounted_products_data, array(
                        'name' => $product->name,
                        'unitary_value_product' => $product->unitary_value_product,
                        'quantity' => $product->quantity,
                        'unitary_value_selled' => $product->unitary_value,
                        'image' => 'data:' . $product->mime_type . ';base64,' . base64_encode($product->image)
                    ));
                    $value_total_products += $product->unitary_value * $product->quantity;
                }

                $mounted_orders_data = array(
                    'id' => $order->id,
                    'invoice' => $order->invoice,
                    'selled_date' => Carbon::parse($order->created_at)->format('Y-m-d'),
                    'value_total_products' => (float) number_format($value_total_products, 2, '.', ''),
                    'value_shipping' => (float) number_format((number_format($order->value_total, 2, '.', '') - number_format($value_total_products, 2, '.', '')), 2, '.', ''),
                    'value_total' => (float) number_format($order->value_total, 2, '.', ''),
                    'quantity' => $order->quantity,
                    'status_order' => $order->status_order,
                    'tracking_code' => $order->tracking_code,
                    'shipped_date' => $order->shipped_date,
                    'estimated_date' => $order->estimated_date,
                    'finished_date' => $order->finished_date,
                    'address' => array(
                        'public_place' => $order->public_place,
                        'district' => $order->district,
                        'number' => $order->number,
                        'complement' => $order->complement,
                        'zip_code' => $order->zip_code,
                        'city' => $order->city,
                        'state' => $order->state,
                        'reference_point' => $order->reference_point
                    ),
                    'payment_method' => $order->payment_method,
                    'card' => [substr_replace($order->number, '***********', 0, 11), $order->flag],
                    'products' => $mounted_products_data
                );
            } else {
                $error = ['code' => 2, 'error_message' => 'Não foi possivel listar a venda.'];
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar a venda.'];
        }

        if (isset($mounted_orders_data) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_orders_data, 'error' => $error ?? null], 200);
        }
        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function update($invoice, Request $request)
    {
        $data = $request->all();

        if (isset($data['tracking_code'])) {
            $order_data['tracking_code'] = $data['tracking_code'];
        }

        if (isset($data['status_order'])) {
            $order_data['status_order'] = $data['status_order'];
        }

        if (isset($data['status_order']) && $data['status_order'] == 6) {
            $address = Order::where('invoice', $invoice)->join('addresses as a', 'a.id', '=', 'orders.address_id')->select('a.*')->fisrt();
            $order_data['shipped_date'] = Carbon::today()->format('Y-m-d');
            $order_data['estimated_date'] = Carbon::today()->add($address->deadline, 'day')->format('Y-m-d');
        }

        if (isset($data['status_order']) && $data['status_order'] == 7) {
            $order_data['finished_date'] = Carbon::today()->format('Y-m-d');
        }

        try {
            $order = Order::where('invoice', $invoice)->update($order_data);
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a venda.'];
        }

        if (isset($order) && !isset($error) && $order) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        } else {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a venda.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
