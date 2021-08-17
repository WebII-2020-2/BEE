<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'cpf', 'level_access', 'birth_date', 'phone', 'image', 'mime_type', 'level_access'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $table = "users";

    public function getJWTCustomClaims(){
        return [];
    }

    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function card(){
        return $this->hasMany('App\Models\Card');
    }

    public function address(){
        return $this->hasMany('App\Models\Address');
    }

    public function order(){
        return $this->hasMany('App\Models\Order');
    }

}
