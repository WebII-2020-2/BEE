<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BannerProduct extends Model
{
    protected $fillable = [
        'banner_id',
        'product_id'
    ];

    protected $table = 'banner_product';

    public function product(){
        return $this->belongsTo('App\Models\Product');
    }
}
