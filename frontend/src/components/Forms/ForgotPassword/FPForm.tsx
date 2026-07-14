"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import styles from "./fpform.module.css";
import { forgotPassword } from "@/src/features/Auth/API/password-managment";

// Componenti riutilizzabili
import Form from "../../UI/Form/Form";
import Input from "../../UI/Inputs/Input";

// Definizione dello schema Zod locale
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "L'indirizzo email è obbligatorio")
    .email("Indirizzo email non valido"),
});

type FPFormData = z.infer<typeof forgotPasswordSchema>;

export default function FPForm() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleForgotPassword(
    data: FPFormData,
    formMethods: UseFormReturn<FPFormData>,
  ) {
    setSuccessMessage(null);

    await forgotPassword(data.email);

    setSuccessMessage(
      "Se l'indirizzo è registrato, riceverai a breve un link di reset.",
    );
    formMethods.setValue("email", "");
  }

  return (
    <Form
      schema={forgotPasswordSchema}
      defaultValues={{ email: "" }}
      onSubmit={handleForgotPassword}
      submitLabel="Invia link di recupero"
      className={styles.form}
    >
      {({ register, formState: { errors } }) => (
        <>
          <h1 className={styles.title}>Recupera Password</h1>

          <p className="text-sm text-gray-500 text-center mb-4 balance-text">
            Inserisci l&apos;email legata al tuo profilo d&apos;artista. Ti
            invieremo un link sicuro per impostare una nuova password.
          </p>

          {/* Messaggio di Successo Locale */}
          {successMessage && (
            <div className="p-3 mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
              {successMessage}
            </div>
          )}

          {/* Campo Email gestito nativamente dallo schema Zod */}
          <Input
            label="Indirizzo Email"
            type="email"
            placeholder="nome@esempio.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </>
      )}
    </Form>
  );
}
