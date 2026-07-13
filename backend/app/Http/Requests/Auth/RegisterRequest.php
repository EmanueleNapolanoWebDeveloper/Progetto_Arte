<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:100'],
            'username' => ['required', 'string', 'min:3', 'max:50', 'alpha_dash', 'unique:users,username'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => [
                'required',
                'confirmed',
                'password' => [
                    'required',
                    'confirmed',
                    'string',
                    'min:8',
                    'regex:/[A-Z]/', // Richiede almeno una maiuscola
                    'regex:/[0-9]/', // Richiede almeno un numero
                ],
            ],
        ];
    }

    public function messages(): array
    {
        return [
            // Messaggi per il campo: name
            'name.required' => "Il nome è obbligatorio.",
            'name.string' => "Il nome deve essere una stringa di testo valido.",
            'name.min' => "Il nome è troppo corto! Inserisci almeno 3 caratteri.",
            'name.max' => "Il nome è troppo lungo! Massimo 100 caratteri.",

            // Messaggi per il campo: username
            'username.required' => "Lo username è obbligatorio.",
            'username.string' => "Lo username deve essere una stringa di testo valida.",
            'username.min' => "Lo username è troppo corto! Inserisci almeno 3 caratteri.",
            'username.max' => "Lo username è troppo lungo! Massimo 50 caratteri.",
            'username.alpha_dash' => "Lo username può contenere solo lettere, numeri, trattini (-) e underscore (_).",
            'username.unique' => "Questo username è già in uso.",

            // Messaggi per il campo: email
            'email.required' => "L'indirizzo e-mail è obbligatorio.",
            'email.string' => "L'indirizzo e-mail deve essere un testo valido.",
            'email.email' => "Inserisci un indirizzo e-mail valido.",
            'email.max' => "L'indirizzo e-mail è troppo lungo! Massimo 255 caratteri.",
            'email.unique' => "Questa e-mail è già in uso.",

            // Messaggi per il campo: password
            'password.required' => "La password è obbligatoria.",
            'password.confirmed' => "Le password inserite non corrispondono.",
            'password.string' => "La password deve essere una stringa di testo valida.",
            'password.min' => "La password deve essere lunga almeno 8 caratteri.",
            // Aggiornati i file delle chiavi dei messaggi per mappare le regex
            'password.regex' => "La password deve contenere almeno una lettera maiuscola e almeno un numero.",
        ];
    }
}
