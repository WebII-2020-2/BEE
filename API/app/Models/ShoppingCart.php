<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    protected $fillable = [
        'product_id',
        'quantity'
    ];

    protected $table = 'shopping_carts';
}
