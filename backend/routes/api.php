<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Api\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
use App\Http\Controllers\Api\Auth\UserController;
use App\Http\Controllers\User\Artists\ArtistApplicationController;
use App\Http\Controllers\User\Artists\ArtistApplicationPortfolioController;
use Illuminate\Support\Facades\Route;

// Rotte di autenticazione
Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisterController::class, 'register'])->middleware('throttle:register');
    Route::post('/login', LoginController::class);
    Route::post('/verify-email', [RegisterController::class, 'verifyEmail'])->middleware('throttle:verify_email');
    Route::post('/forgot-password', ForgotPasswordController::class);
    Route::post('/reset-password', ResetPasswordController::class);
});

Route::get('categories/specialties', [CategoryController::class, 'specialties']);

//Rotte di autenticazione protette
Route::middleware('auth:sanctum')->group(function () {
    // --->ROTTE DI AUTH
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/logout', [UserController::class, 'logout']);

    // --->ROTTE PER ARTIST APPLICATION
    //creazione candidatura
    Route::post('/artist-application', [ArtistApplicationController::class, 'store']);

    //genarazione rpesigned Urls
    Route::post('/artist-application/{applicationId}/presigned-urls', [ArtistApplicationPortfolioController::class, 'getPresignedUrls']);

    //conferma e salvataggio riferimenti su db
    Route::post('/artist-application/{applicationId}/confirm-portfolio', [ArtistApplicationPortfolioController::class, 'confirmPortfolio']);
});



