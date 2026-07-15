<?php

use App\Http\Controllers\Api\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
use App\Http\Controllers\Api\Auth\UserController;
use Illuminate\Support\Facades\Route;

// Rotte di autenticazione
Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisterController::class, 'register'])->middleware('throttle:register');
    Route::post('/login', LoginController::class);
    Route::post('/verify-email', [RegisterController::class, 'verifyEmail'])->middleware('throttle:verify_email');
    Route::post('/forgot-password', ForgotPasswordController::class);
    Route::post('/reset-password', ResetPasswordController::class);
});

//Rotte di autenticazione protette
Route::middleware('auth:sanctum')->group(function () {
    Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'user']);
    Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);
});



