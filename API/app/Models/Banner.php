<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class banner extends Model
{
    protected $fillable = [
        'title',
        'description',
        'image',
        'mime_type',
        'active'
    ];

    protected $table = 'banners';

    public function bannerProduct(){
        return $this->hasMany('App\Models\BannerProduct');
    }
}
