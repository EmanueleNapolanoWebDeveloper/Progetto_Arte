<?php

namespace App\Http\Requests\SRC;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class MediaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //invio solo ad utenti autenticati
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'file' => [
                'required',
                'file',
                'max:10240',
                'mimes:jpg,jpeg,png,gif,webp,pdf',
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'È necessario selezionare un file da caricare.',
            'file.file' => 'Il file inviato non è valido.',
            'file.max' => 'Il file non può superare i 10 MB.',
            'file.mimes' => 'I formati supportati sono: JPG, JPEG, PNG, WEBP, GIF e PDF.',
        ];
    }
}
