"use client";

import { useState } from "react";
import { ApiError } from "@/src/lib/API/client";
import { verifyEmailUser } from "@/src/features/Auth/API/verifyEmailUser"; // <--- Importa la tua nuova funzione
import Link from "next/link";

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
      // Chiamata pulita e tipizzata tramite il tuo nuovo handler
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
          : "Si è verificato un errored di connessione. Riprova tra qualche minuto.",
      );
    }
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-100 bg-white p-8 text-center shadow-xl shadow-zinc-100/50 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-none">
        {/* Icone di Stato dinamiche */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          {status === "idle" && (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
              <svg
                className="h-6 w-6"
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
          {status === "loading" && (
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-indigo-600 dark:border-zinc-700 dark:border-t-indigo-400" />
          )}
          {status === "success" && (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <svg
                className="h-6 w-6"
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
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
              <svg
                className="h-6 w-6"
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
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {status === "success"
              ? "Email Verificata!"
              : "Verifica del Profilo"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 balance-text px-2">
            {message}
          </p>
        </div>

        {/* Azioni Condizionali */}
        <div className="pt-2">
          {token && status !== "success" && status !== "expired" && (
            <button
              onClick={handleVerify}
              disabled={status === "loading"}
              className="w-full inline-flex justify-center items-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow transition-all duration-200 hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {status === "loading" ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white dark:text-zinc-900"
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
            <Link
              href="/login"
              className="w-full inline-flex justify-center items-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow transition-all duration-200 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Accedi al tuo Profilo
            </Link>
          )}

          {status === "expired" && (
            <button
              onClick={() => window.location.reload()}
              className="w-full inline-flex justify-center items-center rounded-xl bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition-all duration-200 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              Richiedi nuovo link
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
