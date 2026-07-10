"use client";

//CSS
import styles from "./loginForm.module.css";

//HOOKS
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

//TYPES
import { LoginFormType } from "@/src/types/Auth/Login";

//ZOD
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/src/schemas/Auth/LoginSchema";

// STORE
import { useAuthStore } from "@/src/store/authStore";

//FEATURES
import { loginUser } from "@/src/features/Auth/API/login_user";

//INTERFACE
interface LoginResponse {
  id: string | null;
  name: string | null;
  username: string | null;
  email: string | null;
}

export default function LoginForm() {
  //RUOTER
  const router = useRouter();

  //STATES
  const [apiError, setApiError] = useState<string | null>(null);

  //AUTH STORE
  const { setUser } = useAuthStore();

  //USEFORM HOOK
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //HANDLE SUBMIT
  async function onSubmit(data: LoginFormType) {
    setApiError(null);

    try {
      console.log("try di login");

      const response = await loginUser(data);

      console.log(response.user);

      if (response?.user) {
        const user = response.user;
        setUser({
          id: user.id ?? "",
          name: user.name ?? "",
          username: user.username ?? "",
          email: user.email ?? "",
        });

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className={styles.error} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className={styles.error} role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      {apiError && (
        <p className={styles.error} role="alert">
          {apiError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? "Accesso in corso..." : "Accedi"}
      </button>
    </form>
  );
}
