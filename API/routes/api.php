<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rotas publicas
Route::post('/forgot/password', 'Api\UserController@forgot');
Route::post('/reset/password', 'Api\UserController@newPassword');
Route::get('/category/list', 'Api\CategoryController@show');
Route::get('/category/best', 'Api\CategoryController@getBestSelled');
Route::get('/category/list/{id}', 'Api\CategoryController@get');
Route::get('/promotion/list', 'Api\PromotionController@show');
Route::get('/promotion/get/products/{id}', 'Api\PromotionController@getProducts');
Route::get('/product/best', 'Api\ProductController@getBestSelled');
Route::get('/product/search', 'Api\ProductController@getByName');
Route::get('/product/list/{id}', 'Api\ProductController@get');
Route::get('/product/list', 'Api\ProductController@show');
Route::get('/banner/list/{id}', 'Api\BannerController@get');
Route::get('/banner/list', 'Api\BannerController@show');

// Logon
Route::group(['middleware' => 'api'], function ($router) {
    Route::post('register', 'Api\UserController@register');
    Route::post('login', 'Api\UserController@login');
    Route::post('get', 'Api\UserController@getUser');
    Route::post('refresh', 'Api\UserController@refresh');
    Route::post('logout', 'Api\UserController@logout');
    Route::post('user/update', 'Api\UserController@update');
    Route::post('change/password', 'Api\UserController@changePassword');
    Route::post('delete', 'Api\UserController@delete');
});

// Cards
Route::group(['middleware' => ['jwt.verify'], 'prefix' => 'card'], function ($router) {
    Route::post('/add', 'Api\CardController@store');
    Route::get('/list', 'Api\CardController@show');
    Route::get('/list/{id}', 'Api\CardController@get');
    Route::post('/update/{id}', 'Api\CardController@update');
    Route::post('/delete/{id}', 'Api\CardController@delete');
});

// Address
Route::group(['middleware' => ['jwt.verify'], 'prefix' => 'address'], function ($router) {
    Route::post('/add', 'Api\AddressController@store');
    Route::get('/list', 'Api\AddressController@show');
    Route::get('/list/{id}', 'Api\AddressController@get');
    Route::post('/update/{id}', 'Api\AddressController@update');
    Route::post('/delete/{id}', 'Api\AddressController@delete');
});

// Products
Route::group(['middleware' => ['jwt.verify', 'access.level'], 'prefix' => 'product'], function ($router) {
    Route::post('/add', 'Api\ProductController@store');
    Route::post('/update/{id}', 'Api\ProductController@update');
    Route::post('/delete/{id}', 'Api\ProductController@delete');
    Route::get('/shipping', 'Api\ProductController@calShipping');
});

// Categories
Route::group(['middleware' => ['jwt.verify', 'access.level'], 'prefix' => 'category'], function ($router) {
    Route::post('/add', 'Api\CategoryController@store');
    Route::post('/update/{id}', 'Api\CategoryController@update');
    Route::post('/delete/{id}', 'Api\CategoryController@delete');
});

// Orders
Route::group(['middleware' => ['jwt.verify', 'access.level'], 'prefix' => 'order'], function ($router) {
    Route::get('/list', 'Api\OrderController@show');
    Route::get('/list/{invoice}', 'Api\OrderController@get');
    Route::post('/update/{invoice}', 'Api\OrderController@update');
});

// Reports
Route::group(['middleware' => ['jwt.verify', 'access.level'], 'prefix' => 'reports'], function ($router) {
    Route::get('/list', 'Api\ReportsController@index');
    Route::get('/list/{date}', 'Api\ReportsController@get');
});

// Promotions
Route::group(['middleware' => ['jwt.verify', 'access.level'], 'prefix' => 'promotion'], function ($router) {
    Route::post('/add', 'Api\PromotionController@store');
    Route::get('/list/{id}', 'Api\PromotionController@get');
    Route::post('/update/{id}', 'Api\PromotionController@update');
    Route::post('/delete/{id}', 'Api\PromotionController@delete');
});

// Banners
Route::group(['middleware' => ['jwt.verify'], 'prefix' => 'banner'], function ($router) {
    Route::post('/add', 'Api\BannerController@store');
    Route::post('/update/{id}', 'Api\BannerController@update');
    Route::post('/delete/{id}', 'Api\BannerController@delete');
});
