<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'unity',
        'quantity',
        'unitary_value',
        'description',
        'mime_type',
        'image',
        'category_id',
        'stripe_product_id',
        'stripe_sku_id'
    ];

    protected $table = 'products';

    
    public function productPromotion(){
        return $this->hasMany('App\Models\ProductPromotion', 'product_id');
    }
}
