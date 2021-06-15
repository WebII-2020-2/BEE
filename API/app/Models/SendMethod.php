<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SendMethod extends Model
{   
    protected $fillable = [
        'name',
        'tax'
    ];

    protected $table = 'send_methods';
}
