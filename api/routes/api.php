<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EstablishmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
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


/**
 * Auth
 */
Route::group([
    'middleware' => ['api', 'cors'],
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

/**
 * Establishment
 */
Route::group([
    'middleware' => ['auth', 'cors'],
    'prefix' => 'establishment'
], function ($router) {
    Route::get('/', [EstablishmentController::class, 'index']);
    Route::get('/{id}', [EstablishmentController::class, 'show']);
    Route::post('/', [EstablishmentController::class, 'store']);
    Route::put('/{id}', [EstablishmentController::class, 'update']);
    Route::delete('/{id}', [EstablishmentController::class, 'destroy']);
});

/**
* Category
*/
Route::group([
    'middleware' => ['auth', 'cors'],
    'prefix' => 'category'
], function ($router) {
    Route::get('/establishment/{establishment_id}', [CategoryController::class, 'index']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::put('/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
});

/**
 * Item
 */
Route::group([
    'middleware' => ['auth', 'cors'],
    'prefix' => 'item'
], function ($router) {
    Route::get('/establishment/{establishment_id}', [ItemController::class, 'index']);
    Route::get('/{id}', [ItemController::class, 'show']);
    Route::post('/', [ItemController::class, 'store']);
    Route::put('/{id}', [ItemController::class, 'update']);
    Route::delete('/{id}', [ItemController::class, 'destroy']);
});


