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
        'allotment',
        'description',
        'mime_type',
        'image',
        'category_id'
    ];

    protected $table = 'products';
}
