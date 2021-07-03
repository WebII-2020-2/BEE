<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPromotion extends Model
{
    protected $fillable = [
        'promotion_id',
        'product_id'
    ];

    protected $table = 'product_promotions';

    public function product(){
        return $this->belongsTo('App\Models\Product');
    }
}
