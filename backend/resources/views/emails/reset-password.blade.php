{{-- resources/views/emails/reset-password.blade.php --}}
<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset della password</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, Helvetica, sans-serif;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
        style="background-color: #f4f4f5; padding: 40px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0"
                    style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">

                    {{-- Header --}}
                    <tr>
                        <td style="background-color: #12161c; padding: 24px 32px;">
                            <span style="color: #ffffff; font-size: 18px; font-weight: bold;">ProgettoArte</span>
                        </td>
                    </tr>

                    {{-- Body --}}
                    <tr>
                        <td style="padding: 32px;">
                            <h1 style="margin: 0 0 16px 0; font-size: 20px; color: #12161c;">
                                Ciao {{ $name }},
                            </h1>

                            <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #52606d;">
                                Abbiamo ricevuto una richiesta di reset della password per il tuo account. Se sei stato
                                tu, clicca sul pulsante qui sotto per impostarne una nuova.
                            </p>

                            <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #52606d;">
                                Il link è valido per <strong>1 ora</strong>. Se non hai richiesto tu il reset, ignora
                                pure questa email: la tua password resterà invariata.
                            </p>

                            {{-- CTA Button --}}
                            <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
                                <tr>
                                    <td style="border-radius: 6px; background-color: #7c5cff;">
                                        <a href="{{ $url }}" target="_blank"
                                            style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 6px;">
                                            Reimposta la password
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 8px 0; font-size: 12px; line-height: 1.6; color: #8b98a5;">
                                Se il pulsante non funziona, copia e incolla questo link nel browser:
                            </p>
                            <p style="margin: 0; font-size: 12px; line-height: 1.6; word-break: break-all;">
                                <a href="{{ $url }}" style="color: #7c5cff;">{{ $url }}</a>
                            </p>
                        </td>
                    </tr>

                    {{-- Footer --}}
                    <tr>
                        <td style="padding: 20px 32px; background-color: #f8f6ff; border-top: 1px solid #eef0ff;">
                            <p style="margin: 0; font-size: 11px; color: #8b98a5; text-align: center;">
                                Se non hai richiesto questo reset, il tuo account resta al sicuro: puoi ignorare questa
                                email.
                            </p>
                            <p style="margin: 8px 0 0 0; font-size: 11px; color: #8b98a5; text-align: center;">
                                &copy; {{ date('Y') }} ProgettoArte. Tutti i diritti riservati.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>

</html>
