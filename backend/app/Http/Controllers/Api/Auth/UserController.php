<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResources;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function user(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => new UserResources($user),
        ], 200);
    }

    public function logout(Request $request)
    {
        // 1. Disconnette l'utente dal Guard corrente
        Auth::guard('web')->logout();

        // 2. Invalida la sessione sul server per renderla inutilizzabile
        $request->session()->invalidate();

        // 3. Rigenera il token CSRF della sessione (mira a prevenire attacchi di fissazione della sessione)
        $request->session()->regenerateToken();

        // 4. Risponde con un 204 No Content (operazione riuscita con successo)
        return response()->noContent();
    }
}
