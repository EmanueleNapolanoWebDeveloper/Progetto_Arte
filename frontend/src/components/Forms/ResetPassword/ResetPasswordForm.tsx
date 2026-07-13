"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, ApiError } from "@/src/lib/API/client";
import styles from "../Login/loginForm.module.css"; // Riutilizziamo lo stesso file di stile dei form

type Status = "idle" | "loading" | "success" | "error";

export default function ResetPasswordForm({
  token,
  email,
}: {
  token: string | null;
  email: string | null;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setStatus("error");
      setMessage("Le due password non corrispondono.");
      return;
    }

    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      await apiFetch("/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      setStatus("success");
      setMessage(
        "Password aggiornata con successo! Verrai reindirizzato al login...",
      );

      // Reindirizza al login dopo 3 secondi
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof ApiError
          ? err.message
          : "Impossibile completare il reset. Riprova più tardi.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Scegli Nuova Password</h1>

      <p className="text-sm text-gray-500 text-center mb-2 balance-text">
        Inserisci la tua nuova password d&aposaccesso per il tuo profilo.
      </p>

      {status === "success" && (
        <div className="p-3 text-sm text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100 text-center">
          {message}
        </div>
      )}

      {/* Campo Nuova Password */}
      <div className={styles.field}>
        <label htmlFor="password">Nuova Password</label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className={styles.input}
          aria-invalid={
            status === "error" && message.includes("corrispondono") === false
          }
        />
      </div>

      {/* Campo Conferma Password */}
      <div className={styles.field}>
        <label htmlFor="password_confirmation">Conferma Nuova Password</label>
        <input
          id="password_confirmation"
          type="password"
          required
          minLength={8}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className={styles.input}
          aria-invalid={status === "error"}
        />
        {status === "error" && (
          <span className={styles.error} role="alert">
            {message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={
          status === "loading" ||
          status === "success" ||
          !password ||
          !passwordConfirmation
        }
        className={styles.submitButton}
      >
        {status === "loading" ? "Aggiornamento..." : "Reimposta Password"}
      </button>
    </form>
  );
}
