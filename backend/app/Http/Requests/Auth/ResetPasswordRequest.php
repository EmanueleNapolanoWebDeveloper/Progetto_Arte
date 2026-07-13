<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'token' => ['required', 'string'],
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'confirmed', Password::min(8)->mixedCase()->numbers()],
        ];
    }

    public function messages(): array
    {
        return [
            'token.required' => 'Il token di recupero è obbligatorio.',
            'token.string' => 'Il token di recupero non è in un formato valido.',

            'email.required' => 'L\'indirizzo email è obbligatorio.',
            'email.string' => 'L\'indirizzo email deve essere una stringa.',
            'email.email' => 'Inserisci un indirizzo email valido.',

            'password.required' => 'La nuova password è obbligatoria.',
            'password.confirmed' => 'La conferma della password non corrisponde.',

            // Messaggi specifici per l'oggetto Password di Laravel
            'password.min' => 'La password deve contenere almeno 8 caratteri.',
            'password.mixed_case' => 'La password deve contenere almeno una lettera maiuscola e una minuscola.',
            'password.numbers' => 'La password deve contenere almeno un numero.',
        ];
    }
}
