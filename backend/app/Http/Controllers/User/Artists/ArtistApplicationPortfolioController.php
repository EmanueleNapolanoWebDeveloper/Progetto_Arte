<?php

namespace App\Http\Controllers\User\Artists;

use App\Http\Controllers\Controller;
use App\Models\User\Artist\ArtistApplication;
use Aws\S3\S3Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArtistApplicationPortfolioController extends Controller
{
    private function makeS3Client(): S3Client
    {
        return new S3Client([
            'version' => 'latest',
            'region' => config('filesystems.disks.s3.region'),
            'endpoint' => config('filesystems.disks.s3.endpoint'),
            'use_path_style_endpoint' => config('filesystems.disks.s3.use_path_style_endpoint'),
            'credentials' => [
                'key' => config('filesystems.disks.s3.key'),
                'secret' => config('filesystems.disks.s3.secret'),
            ],
        ]);
    }

    public function getPresignedUrls(Request $request, string $applicationId): JsonResponse
    {
        $request->validate([
            'files' => ['required', 'array', 'min:3', 'max:5'],
            'files.*' => ['string', 'max:255'],
        ]);

        $files = $request->input('files');

        $client = $this->makeS3Client();
        $bucket = config('filesystems.disks.s3.bucket');

        $urls = [];

        foreach ($files as $file) {
            $safeFileName = Str::slug(pathinfo($file, PATHINFO_FILENAME))
                . '.' . pathinfo($file, PATHINFO_EXTENSION);

            $path = 'portfolios/' . $applicationId . '/' . Str::uuid() . '-' . $safeFileName;

            $command = $client->getCommand('PutObject', [
                'Bucket' => $bucket,
                'Key' => $path,
            ]);

            $presignedRequest = $client->createPresignedRequest($command, '+15 minutes');

            $urls[] = [
                'originalFileName' => $file,
                'uploadUrl' => (string) $presignedRequest->getUri(),
                'fileKey' => $path,
            ];
        }

        return response()->json([
            'urls' => $urls,
        ]);
    }

    public function confirmPortfolio(Request $request, string $applicationId): JsonResponse
    {
        $request->validate([
            'fileKeys' => ['required', 'array', 'min:3', 'max:5'],
            'fileKeys.*' => ['string'],
        ]);

        $application = ArtistApplication::findOrFail($applicationId);

        $savedSamples = [];
        foreach ($request->input('fileKeys') as $index => $fileKey) {
            $savedSamples[] = $application->portfolioSamples()->create([
                'image_url' => $fileKey,
                'sort_order' => $index,
            ]);
        }

        return response()->json([
            'message' => 'Immagini del portfolio registrate con successo',
            'data' => $savedSamples,
        ], 201);
    }
}