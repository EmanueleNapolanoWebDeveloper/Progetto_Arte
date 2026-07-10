<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request): JsonResponse 
    {
        //--->validazione dati
        $credentials = $request->validated();

        //--->tentativo di autenticazione (con flag rememberme)

        //-> ERRORRE: LANCIA ERRORE VALIDAZIONE
        if(!Auth::attempt(
            $credentials,
            $request->boolean('remember')
        )) {
            throw ValidationException::withMessages([
                'email' => ['Le credenziali fornite non sono corrette'],
            ]);
        }

        $request->session()->regenerate();
        $user = Auth::user();

        return response()->json([
            'user' => [
                'id' => (string) $user->id,
                'username' => (string) $user->username,
                'email' => (string) $user->email,
                'name' => (string) $user->name,
            ]
        ], 200);
    }
}
