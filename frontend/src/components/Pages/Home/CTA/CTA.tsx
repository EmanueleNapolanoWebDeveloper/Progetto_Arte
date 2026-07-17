"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./cta.module.css";

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "L'email è obbligatoria")
    .email("Inserisci un'email valida"),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function CTA() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: NewsletterFormValues) {
    setStatus("loading");
    try {
      // TODO: collegare all'endpoint reale, es. POST /api/newsletter/subscribe
      // await api.post("/newsletter/subscribe", values);
      await new Promise((resolve) => setTimeout(resolve, 600)); // placeholder
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section aria-labelledby="final-cta-heading" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Unisciti a noi</p>
        <h2 id="final-cta-heading" className={styles.title}>
          Inizia a collezionare o vendere oggi stesso
        </h2>
        <p className={styles.subtitle}>
          Migliaia di opere originali, artisti verificati e spedizioni
          assicurate. Ricevi le novità direttamente nella tua casella.
        </p>

        <div className={styles.actions}>
          <a href="/opere" className={styles.primaryButton}>
            Esplora le opere
          </a>
          <a href="/diventa-artista" className={styles.secondaryButton}>
            Diventa artista
          </a>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.newsletterForm}
          noValidate
        >
          <div className={styles.fieldGroup}>
            <label htmlFor="newsletter-email" className={styles.srOnly}>
              Indirizzo email
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="La tua email"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={
                errors.email ? "newsletter-email-error" : undefined
              }
              className={`${styles.emailInput} ${
                errors.email ? styles.emailInputError : ""
              }`}
              {...register("email")}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={styles.submitButton}
            >
              {status === "loading" ? "Invio..." : "Iscriviti"}
            </button>
          </div>

          {errors.email && (
            <p
              id="newsletter-email-error"
              role="alert"
              className={styles.errorText}
            >
              {errors.email.message}
            </p>
          )}

          {status === "success" && (
            <p role="status" className={styles.successText}>
              Iscrizione confermata! Controlla la tua casella email.
            </p>
          )}

          {status === "error" && (
            <p role="alert" className={styles.errorText}>
              Qualcosa è andato storto. Riprova tra poco.
            </p>
          )}

          <p className={styles.disclaimer}>
            Iscrivendoti accetti la nostra{" "}
            <a href="/privacy" className={styles.disclaimerLink}>
              Privacy Policy
            </a>
            . Puoi disiscriverti in qualsiasi momento.
          </p>
        </form>
      </div>
    </section>
  );
}
