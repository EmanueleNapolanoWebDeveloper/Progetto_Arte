<?php

namespace App\Http\Requests\User\Artist;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ArtistApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //solo utenti autenticati
        return $this->user() !== null;
    }


    public function rules(): array
    {
        return [
            'previous_application_id' => ['nullable', 'string', 'uuid', 'exists:artist_applications,id'],

            'display_name' => ['required', 'string', 'min:2', 'max:50'],
            'bio' => ['nullable', 'string', 'max:1000'],

            'city' => ['nullable', 'string', 'max:100'],
            'region' => ['nullable', 'string', 'max:100'],
            'country_code' => ['required', 'string', 'size:2'], // ISO 3166-1 alpha-2, es. "IT"

            'website_url' => ['nullable', 'url', 'max:255'],

            'social_links' => ['nullable', 'array'],
            'social_links.instagram' => ['nullable', 'url', 'max:255'],
            'social_links.behance' => ['nullable', 'url', 'max:255'],
            'social_links.facebook' => ['nullable', 'url', 'max:255'],
            'social_links.other' => ['nullable', 'url', 'max:255'],

            'statement' => ['nullable', 'string', 'max:2000'],

            'specialty_ids' => ['required', 'array', 'min:1'],
            'specialty_ids.*' => ['string', 'uuid', 'exists:categories,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'display_name.required' => 'Il nome d\'arte è obbligatorio.',
            'country_code.size' => 'Il codice paese deve essere di 2 lettere (es. IT).',
            'specialty_ids.required' => 'Seleziona almeno una specializzazione.',
            'specialty_ids.min' => 'Seleziona almeno una specializzazione.',
            'specialty_ids.*.exists' => 'Una o più specializzazioni selezionate non sono valide.',
            'website_url.url' => 'L\'URL del sito web non è valido.',
            'social_links.*.url' => 'Il link social inserito non è un URL valido.',
        ];
    }
}
