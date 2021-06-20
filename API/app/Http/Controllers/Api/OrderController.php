<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function show(){
        try{

            $orders = Order
                        ::join('users as u', 'u.id', '=','orders.user_id')
                        ->join('payment_methods as pm', 'pm.id', '=', 'orders.payment_method_id')
                        ->join('send_methods as sm', 'sm.id', '=', 'orders.send_method_id')
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
                            'u.name as name_user',
                            'pm.name as payment_method',
                            'sm.name as send_method'
                        )->get();
            $mounted_orders_data = [];
            foreach($orders as $order){
                $products = $order->productOrder()
                                ->join('products as p','p.id','=','product_orders.product_id')
                                ->select('product_orders.*','p.name', 'p.unitary_value as unitary_value_product')
                                ->get();
                $mounted_products_data = [];
                foreach($products as $product){
                    array_push($mounted_products_data, array(
                        'name' => $product->name,
                        'unitary_value_product' => $product->unitary_value_product,
                        'quantity' => $product->quantity,
                        'unitary_value_selled' => $product->unitary_value
                    ));
                }
                array_push($mounted_orders_data, array(
                    'id' => $order->id,
                    'quantity' => $order->quantity,
                    'value_total' => $order->value_total,
                    'invoice' => $order->invoice,
                    'status_order' => $order->status_order,
                    'shipped_date' => $order->shipped_date,
                    'estimated_date' => $order->estimated_date,
                    'finished_date' => $order->finished_date,
                    'tracking_code' => $order->tracking_code,
                    'name_user' => $order->name_user,
                    'payment_method' => $order->payment_method,
                    'send_method' => $order->send_method,
                    'products' => $mounted_products_data
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
                            'u.name as name_user',
                            'pm.name as payment_method',
                            'sm.name as send_method'
                        )->first();
                        if(!empty($order)){
                            $products = $order->productOrder()
                                            ->join('products as p','p.id','=','product_orders.product_id')
                                            ->select('product_orders.*','p.name', 'p.unitary_value as unitary_value_product')
                                            ->get();
                            $mounted_products_data = [];
                            foreach($products as $product){
                                array_push($mounted_products_data, array(
                                    'name' => $product->name,
                                    'unitary_value_product' => $product->unitary_value_product,
                                    'quantity' => $product->quantity,
                                    'unitary_value_selled' => $product->unitary_value
                                ));
                            }
                            $mounted_orders_data = array(
                                'id' => $order->id,
                                'quantity' => $order->quantity,
                                'value_total' => $order->value_total,
                                'invoice' => $order->invoice,
                                'status_order' => $order->status_order,
                                'shipped_date' => $order->shipped_date,
                                'estimated_date' => $order->estimated_date,
                                'finished_date' => $order->finished_date,
                                'tracking_code' => $order->tracking_code,
                                'name_user' => $order->name_user,
                                'payment_method' => $order->payment_method,
                                'send_method' => $order->send_method,
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
