<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductOrder extends Model
{
    protected $fillable = [
        'product_id',
        'quantity',
        'unitary_value'
    ];

    protected $table = 'product_orders';
}
