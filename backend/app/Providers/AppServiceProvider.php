<?php

namespace App\Providers;

use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);

        //===========================================0
        //IMPOSTAZIONI DI RATE LIMITER
        // Impostiamo un limite per IP ad ogni registrazione (5 ogni 60 min) per evitare spam,bot,ecc.
        //==========================================

        //---> REGISTER
        RateLimiter::for('register', function ($request) {
            return Limit::perMinute(5)->by($request->ip())->response(function (Request $request, array $headers) {
                return response()->json([
                    'error' => 'Troppe richieste di registrazione. Riprova tra qualche minuto.'
                ], 429, $headers);
            });
        });

        //--->VERIFY EMAIL
        RateLimiter::for('verify_email', function (Request $request) {
            return Limit::perMinute(10)->by($request->ip())->response(function (Request $request, array $headers) {
                return response()->json([
                    'error' => 'Troppi tentativi di verifica. Riprova più tardi.'
                ], 429, $headers);
            });
        });
    }
}
