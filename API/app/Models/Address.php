<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = [
        'public_place',
        'district',
        'number',
        'complement',
        'zip_code',
        'city',
        'state',
        'reference_point'
    ];

    protected $table = "addresses";
}
