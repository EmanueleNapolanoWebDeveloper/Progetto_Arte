<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Verifica Email</title>
</head>
<body style="font-family: sans-serif; padding: 20px;">
    <h2>Ciao {{ $name }}!</h2>
    <p>Grazie per esserti registrato sulla nostra piattaforma per artisti emergenti.</p>
    <p>Per attivare il tuo account, clicca sul pulsante qui sotto:</p>
    
    <p style="margin: 30px 0;">
        <a href="{{ $url }}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Verifica la tua Email
        </a>
    </p>

    <p>Se il pulsante non funziona, copia e incolla questo link nel tuo browser:</p>
    <p style="color: #6B7280; font-size: 14px;">{{ $url }}</p>
    
    <hr style="border: 0; border-top: 1px solid #E5E7EB; margin-top: 30px;">
    <p style="font-size: 12px; color: #9CA3AF;">Se non hai creato tu questo account, puoi ignorare questa email.</p>
</body>
</html>