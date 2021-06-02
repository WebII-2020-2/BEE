<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'api'], function ($router) {
    Route::post('register', 'Api\UserController@register');
    Route::post('login', 'Api\UserController@login');
    Route::post('refresh', 'Api\UserController@refresh');
});

Route::group(['middleware' => ['jwt.verify'], 'prefix' => 'card'], function ($router) {
    Route::post('/add', 'Api\CardController@store');
});
