"use client";

import { useState, FormEvent } from "react";
import { apiFetch, ApiError } from "@/src/lib/API/client";
import styles from "./fpform.module.css";

type Status = "idle" | "loading" | "success" | "error";

export default function FPForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      // Sostituisci l'endpoint con quello reale del tuo backend Laravel per il forgot-password
      await apiFetch("/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      setStatus("success");
      setMessage(
        "Se l'indirizzo è registrato, riceverai a breve un link di reset.",
      );
      setEmail(""); // Pulisce l'input
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof ApiError
          ? err.message
          : "Impossibile connettersi al server. Riprova più tardi.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Recupera Password</h1>

      <p className="text-sm text-gray-500 text-center mb-2 balance-text">
        Inserisci l&aposemail legata al tuo profilo d&aposartista. Ti invieremo un link
        sicuro per impostare una nuova password.
      </p>

      {/* Messaggi di Stato (Successo o Errore Globale di connessione) */}
      {message && status !== "error" && (
        <div className="p-3 text-sm text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100 text-center">
          {message}
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="email">Indirizzo Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="nome@esempio.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className={styles.input}
          // Si attiva se c'è un errore, triggerando il CSS `.input[aria-invalid="true"]`
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
        disabled={status === "loading" || !email}
        className={styles.submitButton}
      >
        {status === "loading" ? "Invio in corso..." : "Invia link di recupero"}
      </button>
    </form>
  );
}
