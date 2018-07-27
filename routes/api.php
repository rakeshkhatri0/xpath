<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// The new middleware group "webapi" is added in Kernel
// must backup and update after upgrade.

// member routes
Route::prefix('member')->group(function () {
    Route::group(['middleware' => ['webapi']], function () {
        Route::get('checkLogin', 'MemberController@checkLogin');
        Route::post('login', 'MemberController@login');
        Route::post('create', 'MemberController@store');
        Route::group(['middleware' => ['auth.member']], function () {
            Route::get('all', 'MemberController@index');
            Route::get('show/{memberId}', 'MemberController@show');
            Route::post('update/{memberId}', 'MemberController@update');
            Route::delete('delete/{memberId}', 'MemberController@destroy');
            Route::post('changePassword', 'MemberController@changePassword');
            Route::get('logout', 'MemberController@logout');
        });
    });
});

// project routes
Route::prefix('project')->group(function () {
    Route::group(['middleware' => ['webapi', 'auth.member']], function () {
        Route::get('all', 'ProjectController@index');
        Route::get('show/{projectId}', 'ProjectController@show');
        Route::get('aggregate', 'ProjectController@showAggregate');
        Route::post('create', 'ProjectController@store');
        Route::post('createUrl', 'ProjectController@storeUrl');
        Route::post('update/{projectId}', 'ProjectController@update');
        Route::post('updateStatus/{projectId}', 'ProjectController@updateStatus');
        Route::get('export/{projectId}', 'ProjectController@export');
        Route::delete('delete/{projectId}', 'ProjectController@destroy');
        Route::post('assign', 'ProjectController@assign');
    });
});