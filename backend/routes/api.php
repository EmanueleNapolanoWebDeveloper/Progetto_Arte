<?php

use App\Http\Controllers\Api\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
use App\Http\Controllers\Api\Auth\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', LoginController::class);
Route::post('/verify-email', [RegisterController::class, 'verifyEmail']);
Route::post('/forgot-password', ForgotPasswordController::class);
Route::post('/reset-password', ResetPasswordController::class);

Route::middleware('auth:sanctum')->get('/user', [UserController::class, 'user']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);
