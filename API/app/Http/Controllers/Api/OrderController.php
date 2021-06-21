<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function show(){
        try{

            $orders = Order
                        ::join('users as u', 'u.id', '=','orders.user_id')
                        ->join('payment_methods as pm', 'pm.id', '=', 'orders.payment_method_id')
                        ->join('send_methods as sm', 'sm.id', '=', 'orders.send_method_id')
                        ->orderBy('orders.created_at', 'desc')
                        ->select(
                            'orders.id',
                            'orders.quantity',
                            'orders.value_total',
                            'orders.status_order',
                            'orders.created_at',
                            'u.name as name_user',
                        )->get();
            $mounted_orders_data = [];
            foreach($orders as $order){
                array_push($mounted_orders_data, array(
                    'id' => $order->id,
                    'quantity' => $order->quantity,
                    'value_total' => $order->value_total,
                    'status_order' => $order->status_order,
                    'name_user' => $order->name_user,
                    'selled_date' => Carbon::parse($order->created_at)->format('d-m-Y'),
                ));
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar as vendas.'];
        }

        if(isset($mounted_orders_data) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_orders_data, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function get($id){
        try{

            $order = Order::where('orders.id', $id)
                        ->join('users as u', 'u.id', '=','orders.user_id')
                        ->join('payment_methods as pm', 'pm.id', '=', 'orders.payment_method_id')
                        ->join('send_methods as sm', 'sm.id', '=', 'orders.send_method_id')
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
                            'sm.name as send_method',
                            'a.public_place',
                            'a.district',
                            'a.number',
                            'a.complement',
                            'a.zip_code',
                            'a.city',
                            'a.state',
                            'a.reference_point'
                        )->first();
                        if(!empty($order)){
                            $products = $order->productOrder()
                                            ->join('products as p','p.id','=','product_orders.product_id')
                                            ->select('product_orders.*','p.name', 'p.unitary_value as unitary_value_product')
                                            ->get();
                            $mounted_products_data = [];
                            $value_total_products = 0;
                            foreach($products as $product){
                                array_push($mounted_products_data, array(
                                    'name' => $product->name,
                                    'unitary_value_product' => $product->unitary_value_product,
                                    'quantity' => $product->quantity,
                                    'unitary_value_selled' => $product->unitary_value
                                ));
                                $value_total_products += $product->unitary_value*$product->quantity;
                            }

                            $mounted_orders_data = array(
                                'id' => $order->id,
                                'invoice' => $order->invoice,
                                'selled_date' => Carbon::parse($order->created_at)->format('d-m-Y'),
                                'value_total_products' => (float) number_format($value_total_products, 2, '.', ''),
                                'value_shipping' => number_format($order->value_total, 2, '.', '') - number_format($value_total_products, 2, '.',''),
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
                        }else{
                            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar a venda.'];
                        }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar a venda.'];
        }

        if(isset($mounted_orders_data) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_orders_data, 'error' => $error ?? null], 200);
        }
        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }

    public function update($id, Request $request){
        $data = $request->all();

        if(isset($data['tracking_code'])){
            $order_data['tracking_code'] = $data['tracking_code'];
        }

        if(isset($data['status_order'])){
            $order_data['status_order'] = $data['status_order'];
        }

        try{
            $order = Order::where('id', $id)->update($order_data);
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a venda.'];
        }

        if(isset($order) && !isset($error) && $order){
            return response()->json(['success' => true, 'data' => null, 'error' => $error ?? null], 200);
        }else{
            $error = ['code' => 2, 'error_message' => 'Não foi possivel atualizar a venda.'];
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
