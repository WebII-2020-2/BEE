<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'quantity',
        'value_total',
        'invoice',
        'status_order',
        'shipped_date',
        'estimated_date',
        'finished_date',
        'payment_method_id',
        'tracking_code',
        'address_id'
    ];

    protected $table = 'orders';

    public function productOrder(){
        return $this->hasMany('App\Models\ProductOrder');
    }
}
