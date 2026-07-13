<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyEmailNotification extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
          public User $user,
        public string $token,
    )
    {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Verifica il tuo account - ProgettoArte',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {

    //link che punta al frontend passando per il token
    $verificationUrl = config('app.frontend_url', env('NEXT_PUBLIC_FRONTEND_URL'))
    . '/verify-email?token=' . $this->token;

        return new Content(
            view: 'emails.verify-email',
            with: [
                'url' => $verificationUrl,
                'name' => $this->user->name,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
