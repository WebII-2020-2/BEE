<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    public function index(){
        try{
            $orders = Order::whereRaw('MONTH(created_at) < ?', [Carbon::today()->format('m')])->orderBy('created_at', 'asc')->select('created_at')->get();

            $mounted_dates = [];
            foreach($orders as $order){
                $date = Carbon::parse($order->created_at)->format('m/Y');
                if(!in_array($date, $mounted_dates)){
                    $mounted_dates[] = $date;
                }
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar os mêses fechados.', 'exception' => $exception];
        }

        if(isset($mounted_dates) && !isset($error)){
            return response()->json(['success' => true, 'data' => array('months' => $mounted_dates), 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);

    }

    public function get($date){
        try{
            [$month, $year] = explode('-',$date);
            $orders = Order::whereRaw('MONTH(orders.created_at) = ? and YEAR(orders.created_at) = ?', [$month, $year])
                        ->orderBy('created_at', 'desc')
                        ->select(
                            'orders.id',
                            'orders.quantity',
                            'orders.value_total',
                            'orders.created_at'
                        )->get();
            $mounted_orders_data = [];
            foreach($orders as $order){
                $products = $order->productOrder()
                                ->join('products as p','p.id','=','product_orders.product_id')
                                ->select('product_orders.*')
                                ->get();
                $value_total_products = 0;
                foreach($products as $product){
                    $value_total_products += $product->unitary_value*$product->quantity;
                }

                array_push($mounted_orders_data, array(
                    'products' => $order->quantity,
                    'value' => (float) number_format($value_total_products, 2, '.', ''),
                    'day' => Carbon::parse($order->created_at)->format('d'),
                ));
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar o relatório.'];
        }

        if(isset($mounted_orders_data) && !isset($error)){
            return response()->json(['success' => true, 'data' => $mounted_orders_data, 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
