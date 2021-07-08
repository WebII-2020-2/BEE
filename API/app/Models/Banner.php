<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class banner extends Model
{
    protected $fillable = [
        'id',
        'title',
        'description',
        'image',
        'mime_type',
        'active'
    ];

    protected $table = 'banners';
}
