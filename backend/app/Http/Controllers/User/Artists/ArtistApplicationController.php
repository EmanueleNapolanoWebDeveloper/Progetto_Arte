<?php

namespace App\Http\Controllers\User\Artists;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\Artist\ArtistApplicationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class ArtistApplicationController extends Controller
{
    public function store(ArtistApplicationRequest $request): JsonResponse
    {

        $validated = $request->validated();

        try {
            $application = DB::transaction(function () use ($validated, $request) {
                $app = $request->user()->artistApplications()->create([
                    'previous_application_id' => $validated['previous_application_id'],
                    'display_name' => $validated['display_name'],
                    'bio' => $validated['bio'] ?? null,
                    'city' => $validated['city'] ?? null,
                    'region' => $validated['region'] ?? null,
                    'country_code' => $validated['country_code'],
                    'website_url' => $validated['website_url'] ?? null,
                    'social_links' => $validated['social_links'] ?? null,
                    'statement' => $validated['statement'] ?? null,
                    'status' => 'pending',
                ]);

                //collegamento a specialties
                if (!empty($validated['specialty_ids'])) {
                    $app->specialties()->sync($validated['specialty_ids']);
                }

                return $app;
            });

            //risposta di successo
            return response()->json([
                'message' => 'Candidatura creata con successo',
                'data' => [
                    'id' => $application->id,
                    'status' => $application->status
                ],
            ], 201);
        } catch (Throwable $e) {
            Log::error('Errore durante il salvataggio della candidatura artista: ' . $e->getMessage(), [
                'exception' => $e,
                'user_id' => $request->user()?->id,
            ]);

            return response()->json([
                'message' => 'Errore durante il salvataggio della candidatura. Riprova più tardi.',
            ], 500);
        }
    }
}
