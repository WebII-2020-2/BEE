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
        'payment_method_id',
        'send_method_id'
    ];

    protected $table = 'orders';
}
