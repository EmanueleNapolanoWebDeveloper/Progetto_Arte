"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import styles from "../Login/loginForm.module.css";
import { resetPassword } from "@/src/features/Auth/API/password-managment";

// Componenti riutilizzabili
import Form from "../../UI/Form/Form";
import Input from "../../UI/Inputs/Input";

// Definizione dello schema Zod locale
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "La password deve contenere almeno 8 caratteri"),
    password_confirmation: z.string().min(1, "Conferma la tua password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Le due password non corrispondono",
    path: ["password_confirmation"], // Evidenzia l'errore sul campo di conferma
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm({
  token,
  email,
}: {
  token: string | null;
  email: string | null;
}) {
  const router = useRouter();

  // Teniamo questo stato solo per il messaggio di successo, poiché l'errore è gestito dal Form globale
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Se manca il token nell'URL, blocchiamo il form all'inizio
  if (!token || !email) {
    return (
      <div className={styles.form}>
        <h1 className={styles.title}>Link non valido</h1>
        <p className="text-sm text-red-500 text-center">
          Il token di recupero è mancante o non valido. Richiedi un nuovo link
          di reset.
        </p>
      </div>
    );
  }

  async function handleResetPassword(data: ResetPasswordFormData) {
    setSuccessMessage(null);

    await resetPassword({
      token: token!,
      email: email!,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });

    setSuccessMessage(
      "Password aggiornata con successo! Verrai reindirizzato al login...",
    );

    setTimeout(() => {
      router.push("/login");
    }, 3000);
  }

  return (
    <Form
      schema={resetPasswordSchema}
      defaultValues={{
        password: "",
        password_confirmation: "",
      }}
      onSubmit={handleResetPassword}
      submitLabel="Reimposta Password"
      className={styles.form}
    >
      {({ register, formState: { errors } }) => (
        <>
          <h1 className={styles.title}>Scegli Nuova Password</h1>

          <p className="text-sm text-gray-500 text-center mb-4 balance-text">
            Inserisci la tua nuova password d&apos;accesso per il tuo profilo.
          </p>

          {/* Messaggio di Successo Locale */}
          {successMessage && (
            <div className="p-3 mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
              {successMessage}
            </div>
          )}

          {/* Campo Nuova Password */}
          <Input
            label="Nuova Password"
            type="password"
            placeholder="Minimo 8 caratteri"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Campo Conferma Password */}
          <Input
            label="Conferma Nuova Password"
            type="password"
            placeholder="Ripeti la nuova password"
            error={errors.password_confirmation?.message}
            {...register("password_confirmation")}
          />
        </>
      )}
    </Form>
  );
}
