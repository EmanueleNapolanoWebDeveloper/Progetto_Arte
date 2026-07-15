<?php

namespace App\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationException extends Exception
{
    protected int $statusCode;
    protected array $errors = [];

    public function __construct(
        string $message = "",
        int $statusCode = 0,
        array $errors = []
    ) {
        parent::__construct($message);
        $this->statusCode = $statusCode;
        $this->errors = $errors;
    }

    public static function invalidCredentials(): self
    {
        return new self(
            'Le credenziali fornite non sono corrette.',
            Response::HTTP_UNPROCESSABLE_ENTITY,
            [
                'email' => [
                    'Le credenziali fornite non sono corrette.'
                ]
            ]
        );
    }

    //account bannato
    public static function accountBanned(): self
    {
        return new self(
            'Questo account è stato permanentemente sospeso a causa di violazioni dei termini di servizio.',
            Response::HTTP_FORBIDDEN,
            [
                'account' => [
                    'Accesso Negato!'
                ]
            ]
        );
    }

    //account sospeso
    public static function accountSuspended(string $endsAt): self
    {
        $date = date('d/m/Y H:i', strtotime($endsAt));
        return new self(
            "Questo account è temporaneamente sospeso. L'accesso sarà ripristinato il {$date}.",
            Response::HTTP_FORBIDDEN,
            ['account' => ['Accesso temporaneamente negato.']]
        );
    }

    //account locked
    public static function accountLocked($lockedUntil): self
    {
        $retryAfter = now()->diffInSeconds($lockedUntil);
        return new self(
            "Troppi tentativi di accesso falliti. L'account è temporaneamente bloccato. Riprova tra " . ceil($retryAfter / 60) . " minuti.",
            Response::HTTP_TOO_MANY_REQUESTS,
            ['account' => ['Account bloccato temporaneamente.']]
        );
    }

    //superata soglia rate limited
    public static function rateLimited(): self
    {
        return new self(
            'Troppe richieste dal tuo indirizzo IP. Riprova più tardi.',
            Response::HTTP_TOO_MANY_REQUESTS,
            ['rate_limit' => ['Richieste limitate su base IP.']]
        );
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}
