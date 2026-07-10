"use client";

import styles from "./registerForm.module.css";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormType } from "../../../types/Auth/Register";

import {
  registerSchema,
  RegisterFormData,
} from "@/src/schemas/Auth/RegisterSchema";
import { registerUser } from "@/src/features/Auth/API/register_user";
import { ApiError } from "@/src/lib/API/client";

export default function RegisterForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormType) {
    setApiError(null);

    try {
      const result = await registerUser(data);

      if (!result) {
        console.log("Fallita resposne");
        return;
      }
      router.push("/");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 422 && err.errors) {
          Object.entries(err.errors).forEach(([fields, message]) => {
            setError(fields as keyof RegisterFormData, {
              type: "server",
              message: message[0],
            });
            return;
          });
        }

        setApiError(err.message);
        return;
      }
      setApiError(
        "Impossibile contattare il server. Controlla la connessione!",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h3 className={styles.title}>Registrazione</h3>

      <input
        {...register("name")}
        placeholder="Nome"
        className={styles.input}
      />

      {errors.name && <p className={styles.error}>{errors.name.message}</p>}

      <input
        {...register("username")}
        placeholder="Username"
        className={styles.input}
      />

      {errors.username && (
        <p className={styles.error}>{errors.username.message}</p>
      )}

      <input
        {...register("email")}
        placeholder="Email"
        type="email"
        className={styles.input}
      />

      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <input
        {...register("password")}
        placeholder="Password"
        type="password"
        className={styles.input}
      />

      {errors.password && (
        <p className={styles.error}>{errors.password.message}</p>
      )}

      <input
        {...register("password_confirmation")}
        placeholder="Conferma password"
        type="password"
        className={styles.input}
      />

      {errors.password_confirmation && (
        <p className={styles.error}>{errors.password_confirmation.message}</p>
      )}

      <button type="submit">Registrati</button>
    </form>
  );
}
