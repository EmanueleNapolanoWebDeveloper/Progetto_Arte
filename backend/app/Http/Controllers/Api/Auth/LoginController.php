<?php

namespace App\Http\Controllers\Api\Auth;

use App\Actions\Auth\AuthenticateUserAction;
use App\Exceptions\AuthenticationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function __invoke(
        LoginRequest $request,
        AuthenticateUserAction $authenticateUser,
    ): JsonResponse {
        //--->validazione dati
        $credentials = $request->validated();

        //--->tentativo di autenticazione (con flag rememberme)
        try {
            $user = $authenticateUser->execute($request);
        } catch (AuthenticationException $e) {
            throw ValidationException::withMessages([
                'email' => [$e->getMessage()],
            ]);
        }

        //risposta di successo
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
