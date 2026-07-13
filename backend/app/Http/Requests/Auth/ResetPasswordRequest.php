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
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => [
                'required',
                'confirmed',
                'string',
                'min:8',
                'regex:/[A-Z]/', // Richiede almeno una maiuscola
                'regex:/[0-9]/', // Richiede almeno un numero
            ],
        ];
    }

    public function messages(): array
    {
        return [
            // Messaggi per il campo: token
            'token.required' => "Il token di recupero è obbligatorio.",
            'token.string' => "Il token di recupero deve essere una stringa valida.",

            // Messaggi per il campo: email
            'email.required' => "L'indirizzo e-mail è obbligatorio.",
            'email.string' => "L'indirizzo e-mail deve essere un testo valido.",
            'email.email' => "Inserisci un indirizzo e-mail valido.",
            'email.max' => "L'indirizzo e-mail è troppo lungo! Massimo 255 caratteri.",
            'password.required' => "La password è obbligatoria.",
            'password.confirmed' => "Le password inserite non corrispondono.",
            'password.string' => "La password deve essere una stringa di testo valida.",
            'password.min' => "La password deve essere lunga almeno 8 caratteri.",
            // Aggiornati i file delle chiavi dei messaggi per mappare le regex
            'password.regex' => "La password deve contenere almeno una lettera maiuscola e almeno un numero.",
        ];
    }
}
