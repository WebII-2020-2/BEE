<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Logon
Route::group(['middleware' => 'api'], function ($router) {
    Route::post('register', 'Api\UserController@register');
    Route::post('login', 'Api\UserController@login');
    Route::post('refresh', 'Api\UserController@refresh');
    Route::post('logout', 'Api\UserController@logout');
});

// Cards
Route::group(['middleware' => ['jwt.verify'], 'prefix' => 'card'], function ($router) {
    Route::post('/add', 'Api\CardController@store');
});

// Products
Route::group(['middleware' => ['jwt.verify'], 'prefix' => 'product'], function ($router) {
    Route::post('/add', 'Api\ProductController@store');
    Route::get('/list', 'Api\ProductController@show');
    Route::post('/update', 'Api\ProductController@update');
    Route::post('/delete', 'Api\ProductController@delete');
});

// Categories
Route::group(['middleware' => ['jwt.verify'], 'prefix' => 'category'], function ($router) {
    Route::post('/add', 'Api\CategoryController@store');
    Route::get('/list', 'Api\CategoryController@show');
    Route::post('/update', 'Api\CategoryController@update');
    Route::post('/delete', 'Api\CategoryController@delete');
});
