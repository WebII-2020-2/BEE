<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Log;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductOrder;
use App\Models\ProductPromotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();

        $data_image = preg_split("/^data:(.*);base64,/", $data['image'], -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);

        try {
            $response_request_product = Http::asForm()->withHeaders([
                'Authorization' => 'Bearer '.config('app.stripe_token')
            ])
            ->post('https://api.stripe.com/v1/products', [
                'name' => $data['name'],
                'type' => 'good'
            ])->json();

            $response_request_sku = Http::asForm()->withHeaders([
                'Authorization' => 'Bearer '.config('app.stripe_token')
            ])
            ->post('https://api.stripe.com/v1/skus', [
                'price' => str_replace([',','.'], ['',''], number_format($data['unitary_value'], 2, '.', '')),
                'currency' => 'BRL',
                'inventory[type]' => 'finite',
                'inventory[quantity]' => $data['quantity'],
                'product' => $response_request_product['id']
            ])->json();

            $result_product = Product::create([
                'name' => $data['name'],
                'unity' => $data['unity'],
                'quantity' => $data['quantity'],
                'unitary_value' => $data['unitary_value'],
                'description' => $data['description'],
                'mime_type' => $data_image[0],
                'image' => base64_decode($data_image[1]),
                'category_id' => $data['category_id'],
                'stripe_product_id' => $response_request_product['id'],
                'stripe_sku_id' => $response_request_sku['id']
            ]);

            Log::create([
                'type' => 'product',
                'information' => 'create product, sku and save product - SUCCESS',
                'data' => json_encode([$data ?? null, $response_request_product ?? null, $response_request_sku ?? null, $result_product ?? null])
            ]);
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel salvar o produto.'];
            Log::create([
                'type' => 'product',
                'information' => 'create product, sku and save product - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if (isset($result_product) && !isset($error)) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function show()
    {
        try {
            $products = Product::orderBy('name', 'asc')->join('categories as c', 'c.id', '=', 'products.category_id')->select('products.*', 'c.name as category')->get();

            $mounted_products = [];
            foreach ($products as $product) {
                $product_promotion = ProductPromotion::where('product_id', $product->id)
                    ->join('promotions as p', 'p.id', '=', 'product_promotions.promotion_id')->first();

                if ($product_promotion) {
                    $product_with_promotion = $product_promotion->type == 1 ?
                        ($product->unitary_value - $product_promotion->value) :
                        $product->unitary_value - ($product_promotion->value / 100);
                }
                array_push($mounted_products, array(
                    "id" => $product->id,
                    'name' => $product->name,
                    'unity' => $product->unity,
                    'quantity' => $product->quantity,
                    'unitary_value' => $product->unitary_value,
                    'description' => $product->description,
                    'image' => 'data:' . $product->mime_type . ';base64,' . base64_encode($product->image),
                    'category_id' => $product->category_id,
                    'category' => $product->category,
                    'value_promotion' => isset($product_with_promotion) ? (float) number_format($product_with_promotion, 2, '.', '') : null
                ));
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar os produtos.', $exception];
            Log::create([
                'type' => 'product',
                'information' => 'show product - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if (isset($mounted_products) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_products, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function get($id)
    {
        try {
            $product = Product::where('products.id', $id)->join('categories as c', 'c.id', '=', 'products.category_id')->select('products.*', 'c.name as category')->first();

            $product_promotion = ProductPromotion::where('product_id', $id)
                ->join('promotions as p', 'p.id', '=', 'product_promotions.promotion_id')->first();

            if ($product_promotion) {
                $product_with_promotion = $product_promotion->type == 1 ?
                    ($product->unitary_value - $product_promotion->value) :
                    $product->unitary_value - ($product_promotion->value / 100);
            }

            $mounted_product = array(
                "id" => $product->id,
                'name' => $product->name,
                'unity' => $product->unity,
                'quantity' => $product->quantity,
                'unitary_value' => $product->unitary_value,
                'description' => $product->description,
                'image' => 'data:' . $product->mime_type . ';base64,' . base64_encode($product->image),
                'category_id' => $product->category_id,
                'category' => $product->category,
                'value_promotion' => isset($product_with_promotion) ? (float) number_format($product_with_promotion, 2, '.', '') : null
            );
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar o produto.'];
            Log::create([
                'type' => 'product',
                'information' => 'get product - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if (isset($mounted_product) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_product, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function getBestSelled()
    {
        try {
            $products = Order
                ::join('product_orders as po', 'po.order_id', '=', 'orders.id')
                ->join('products as p', 'p.id', '=', 'po.product_id')
                ->groupBy('p.id', 'p.name', 'p.mime_type', 'p.image', 'p.unitary_value')
                ->orderByRaw('SUM(po.quantity) DESC')
                ->limit(16)
                ->select('p.id', 'p.name', 'p.mime_type', 'p.image', 'p.unitary_value')
                ->get();

            $mounted_products = [];
            foreach ($products as $product) {
                $product_promotion = ProductPromotion::where('product_id', $product->id)
                ->join('promotions as p', 'p.id', '=', 'product_promotions.promotion_id')->first();

                if ($product_promotion) {
                    $product_with_promotion = $product_promotion->type == 1 ?
                        ($product->unitary_value - $product_promotion->value) :
                        $product->unitary_value - ($product_promotion->value / 100);
                }


                array_push($mounted_products, array(
                    "id" => $product->id,
                    'name' => $product->name,
                    'unitary_value' => $product->unitary_value,
                    'image' => 'data:' . $product->mime_type . ';base64,' . base64_encode($product->image),
                    'value_promotion' => isset($product_with_promotion) ? (float) number_format($product_with_promotion, 2, '.', '') : null
                ));
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar os produtos em destaque.', $exception];
            Log::create([
                'type' => 'product',
                'information' => 'get_best_seller - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if (isset($mounted_products) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_products, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function getByName(Request $request)
    {
        $name = $request->only("name")['name'];

        try {
            $products = Product::where('products.name', 'like', '%' . $name . '%')->join('categories as c', 'c.id', '=', 'products.category_id')->select('products.*', 'c.name as category')->get();

            $mounted_products = [];
            foreach($products as $product){
                array_push($mounted_products, array(
                    "id" => $product->id,
                    'name' => $product->name,
                    'unity' => $product->unity,
                    'quantity' => $product->quantity,
                    'unitary_value' => $product->unitary_value,
                    'description' => $product->description,
                    'image' => 'data:' . $product->mime_type . ';base64,' . base64_encode($product->image),
                    'category_id' => $product->category_id,
                    'category' => $product->category
                ));
            }
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar o produto.'];
            Log::create([
                'type' => 'product',
                'information' => 'get_by_name - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if (isset($mounted_products) && !isset($error)) {
            return response()->json(['success' => true, 'data' => $mounted_products, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function update($id, Request $request)
    {
        $data = $request->all();

        $data_image = preg_split("/^data:(.*);base64,/", $data['image'], -1, PREG_SPLIT_NO_EMPTY | PREG_SPLIT_DELIM_CAPTURE);

        if (isset($data['name'])) {
            $product['name'] = $data['name'];
        }
        if (isset($data['unity'])) {
            $product['unity'] = $data['unity'];
        }
        if (isset($data['quantity'])) {
            $product['quantity'] = $data['quantity'];
            $send_product['inventory[quantity]'] = $data['quantity'];
        }
        if (isset($data['unitary_value'])) {
            $product['unitary_value'] = $data['unitary_value'];
            $send_product['price'] = str_replace([',','.'], ['', ''], number_format($data['unitary_value'], 2, '.', ''));
        }
        if (isset($data['description'])) {
            $product['description'] = $data['description'];
        }
        if (isset($data['image'])) {
            $product['mime_type'] = $data_image[0];
        }
        if (isset($data['image'])) {
            $product['image'] = base64_decode($data_image[1]);
        }
        if (isset($data['category_id'])) {
            $product['category_id'] = $data['category_id'];
        }
        try {
            $product_info = Product::find($id);
            if(!empty($product['name'])){
                $response_request_product = Http::asForm()->withHeaders([
                    'Authorization' => 'Bearer '.config('app.stripe_token')
                ])
                ->post('https://api.stripe.com/v1/products/'.$product_info->stripe_product_id, [
                    'name' => $product['name']
                ])->json();
            }
            if(!empty($product['quantity']) || !empty($product['unitary_value'])){
                $response_request_sku = Http::asForm()->withHeaders([
                    'Authorization' => 'Bearer '.config('app.stripe_token')
                ])
                ->post('https://api.stripe.com/v1/skus/'.$product_info->stripe_sku_id, $send_product)->json();
            }

            $result_product = Product::where('id', $id)->update($product);

            Log::create([
                'type' => 'product',
                'information' => 'update product, sku and update product - SUCCESS',
                'data' => json_encode([$data ?? null, $response_request_product ?? null, $response_request_sku ?? null, $result_product ?? null])
            ]);
        } catch (\Exception $exception) {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar o produto.', $exception];
            Log::create([
                'type' => 'product',
                'information' => 'update product, sku and update product - ERROR',
                'data' => substr($exception->getMessage(), 0, 300)
            ]);
        }

        if (isset($result_product) && !isset($error) && $result_product) {
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        } else {
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar o produto.'];
            Log::create([
                'type' => 'product',
                'information' => 'update product, sku and update product - ERROR',
                'data' => "not save data"
            ]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function delete($id, Request $request)
    {
        $data = $request->all();

        $order = ProductOrder::where('product_id', $id)->first();

        if (is_null($order)) {
            try {
                $product_info = Product::find($id);

                $response_request_product = Http::asForm()->withHeaders([
                    'Authorization' => 'Bearer '.config('app.stripe_token')
                ])
                ->delete('https://api.stripe.com/v1/products/'.$product_info->stripe_product_id)->json();

                $response_request_sku = Http::asForm()->withHeaders([
                    'Authorization' => 'Bearer '.config('app.stripe_token')
                ])
                ->delete('https://api.stripe.com/v1/skus/'.$product_info->stripe_sku_id)->json();

                $product = Product::where('id', $id)->delete();

                Log::create([
                    'type' => 'product',
                    'information' => 'delete product, sku and delete product - SUCCESS',
                    'data' => json_encode([$data ?? null, $response_request_product ?? null, $response_request_sku ?? null, $product ?? null])
                ]);
            } catch (\Exception $exception) {
                $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar o produto.'];
                Log::create([
                    'type' => 'product',
                    'information' => 'delete product, sku and delete product - ERROR',
                    'data' => substr($exception->getMessage(), 0, 300)
                ]);
            }

            if (isset($product) && !isset($error) && $product) {
                return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
            } else {
                $error = ['code' => 2, 'error_message' => 'Não foi possivel deletar o produto.'];
                Log::create([
                    'type' => 'product',
                    'information' => 'delete product, sku and delete product - ERROR',
                    'data' => "not delete data"
                ]);
            }
        } else {
            $error = ['code' => 2, 'error_message' => 'Este produto está relacionado a uma venda.'];
            Log::create([
                'type' => 'product',
                'information' => 'delete product, sku and delete product - ERROR',
                'data' => "product is in order"
            ]);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
