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
                $mounted_dates[] = Carbon::parse($order->created_at)->format('m/Y');
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
                            'orders.quantity',
                            'orders.value_total',
                            'orders.created_at'
                        )->get();
            $mounted_orders_data = [];
            $value_total = 0;
            $products_total = 0;
            foreach($orders as $order){
                $products_total += $order->quantity;
                $value_total += $order->value_total;

                array_push($mounted_orders_data, array(
                    'quantity' => $order->quantity,
                    'value_total' => $order->value_total,
                    'selled_date' => $order->created_at,
                ));
            }
        }catch(\Exception $exception){
            $error = ['code' => 2, 'error_message' => 'Não foi possivel listar o relatório.'];
        }

        if(isset($mounted_orders_data) && !isset($error)){
            return response()->json(['success' => true, 'data' => array('orders' => $mounted_orders_data, 'value_total' => $value_total, 'product_total' => $products_total), 'error' => $error ?? null], 200);
        }

        return response()->json(['success' => false, 'data' => null, 'error' => $error ?? null], 400);
    }
}
