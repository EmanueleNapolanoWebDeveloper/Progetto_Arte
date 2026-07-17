// components/auth/VerifyEmail/VerifyEmailClient.tsx
"use client";

import { useState } from "react";
import { ApiError } from "@/src/lib/API/client";
import { verifyEmailUser } from "@/src/features/Auth/API/verifyEmailUser";
import Link from "next/link";
import styles from "./verifyEmail.module.css";

type Status = "idle" | "loading" | "success" | "expired" | "error";

export default function VerifyEmailClient({ token }: { token: string | null }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState(
    token
      ? "Clicca sul pulsante qui sotto per confermare la verifica del tuo account e iniziare a esporre le tue opere."
      : "Il link di verifica non è valido o il token è mancante. Riprova o richiedi un nuovo invio.",
  );

  async function handleVerify() {
    if (!token || status === "loading") return;
    setStatus("loading");
    setMessage("Stiamo verificando le tue credenziali d'accesso...");

    try {
      await verifyEmailUser(token);

      setStatus("success");
      setMessage(
        "Account verificato con successo! Benvenuto nella community di ProgettoArte.",
      );
    } catch (err) {
      if (err instanceof ApiError && err.status === 410) {
        setStatus("expired");
        setMessage(
          "Questo link di verifica è scaduto per motivi di sicurezza. Richiedine uno nuovo.",
        );
        return;
      }
      setStatus("error");
      setMessage(
        err instanceof ApiError
          ? err.message
          : "Si è verificato un errore di connessione. Riprova tra qualche minuto.",
      );
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Icone di Stato dinamiche */}
        <div className={styles.iconWrapper}>
          {status === "idle" && (
            <div className={`${styles.iconCircle} ${styles.iconCircleIdle}`}>
              <svg
                className={styles.icon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                />
              </svg>
            </div>
          )}
          {status === "loading" && <div className={styles.spinner} />}
          {status === "success" && (
            <div className={`${styles.iconCircle} ${styles.iconCircleSuccess}`}>
              <svg
                className={styles.icon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
          {(status === "error" || status === "expired" || !token) && (
            <div className={`${styles.iconCircle} ${styles.iconCircleWarning}`}>
              <svg
                className={styles.icon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Testi */}
        <div className={styles.textGroup}>
          <h1 className={styles.title}>
            {status === "success"
              ? "Email Verificata!"
              : "Verifica del Profilo"}
          </h1>
          <p className={styles.message}>{message}</p>
        </div>

        {/* Azioni Condizionali */}
        <div className={styles.actions}>
          {token && status !== "success" && status !== "expired" && (
            <button
              onClick={handleVerify}
              disabled={status === "loading"}
              className={styles.primaryButton}
            >
              {status === "loading" ? (
                <>
                  <svg
                    className={styles.buttonSpinner}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Elaborazione...
                </>
              ) : (
                "Verifica Account"
              )}
            </button>
          )}

          {status === "success" && (
            <Link href="/login" className={styles.primaryButton}>
              Accedi al tuo Profilo
            </Link>
          )}

          {status === "expired" && (
            <button
              onClick={() => window.location.reload()}
              className={styles.secondaryButton}
            >
              Richiedi nuovo link
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
