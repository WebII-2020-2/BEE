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
Route::group(['middleware' => ['jwt.verify', 'access.level'], 'prefix' => 'card'], function ($router) {
    Route::post('/add', 'Api\CardController@store');
});

// Products
Route::group(['middleware' => ['jwt.verify', 'access.level'], 'prefix' => 'product'], function ($router) {
    Route::post('/add', 'Api\ProductController@store');
    Route::get('/list', 'Api\ProductController@show');
    Route::get('/list/{id}', 'Api\ProductController@get');
    Route::post('/update/{id}', 'Api\ProductController@update');
    Route::post('/delete/{id}', 'Api\ProductController@delete');
});

// Categories
Route::group(['middleware' => ['jwt.verify', 'access.level'], 'prefix' => 'category'], function ($router) {
    Route::post('/add', 'Api\CategoryController@store');
    Route::get('/list', 'Api\CategoryController@show');
    Route::get('/list/{id}', 'Api\CategoryController@get');
    Route::post('/update/{id}', 'Api\CategoryController@update');
    Route::post('/delete/{id}', 'Api\CategoryController@delete');
});

// Orders
Route::group(['middleware' => ['jwt.verify', 'access.level'], 'prefix' => 'order'], function ($router) {
    Route::get('/list', 'Api\OrderController@show');
    Route::get('/list/{id}', 'Api\OrderController@get');
    Route::post('/update/{id}', 'Api\OrderController@update');
});

// Reports
Route::group(['middleware' => ['jwt.verify', 'access.level'], 'prefix' => 'reports'], function ($router) {
    Route::get('/list', 'Api\ReportsController@index');
    Route::get('/list/{date}', 'Api\ReportsController@get');
});
