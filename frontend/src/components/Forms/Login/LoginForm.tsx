// components/auth/LoginForm/LoginForm.tsx
"use client";

import styles from "./loginForm.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { loginSchema, LoginFormData } from "@/src/schemas/Auth/LoginSchema";
import { useAuthStore } from "@/src/store/authStore";
import { loginUser } from "@/src/features/Auth/API/login_user";

import Form from "../../UI/Form/Form";
import Input from "../../UI/Inputs/Input";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  async function handleLogin(data: LoginFormData) {
    const response = await loginUser(data);

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
  }

  return (
    <div>
      {/* Header del form: eyebrow + titolo + sottotitolo */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>Bentornato</p>
        <h1 className={styles.title}>Accedi al tuo account</h1>
        <p className={styles.subtitle}>
          Continua a scoprire e collezionare opere originali dai migliori
          artisti emergenti.
        </p>
      </div>

      <Form
        schema={loginSchema}
        defaultValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        onSubmit={handleLogin}
        submitLabel="Accedi"
        className={styles.form}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label="Email"
              type="email"
              placeholder="nome@esempio.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Inserisci la tua password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className={styles.optionsRow}>
              <Input
                type="checkbox"
                label="Ricordami"
                {...register("rememberMe")}
              />

              <Link
                href="/forgot-password"
                className={styles.forgotPasswordLink}
              >
                Password dimenticata?
              </Link>
            </div>

            {/* Trust signal: rassicura sulla sicurezza dei dati, coerente col posizionamento premium della piattaforma */}
            <div className={styles.trustNote}>
              <svg
                className={styles.trustIcon}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M10 2L3 5v5c0 4.2 2.9 7.9 7 9 4.1-1.1 7-4.8 7-9V5l-7-3z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 10l1.8 1.8L13 8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                I tuoi dati sono protetti e non verranno mai condivisi
              </span>
            </div>
          </>
        )}
      </Form>

      <div className={styles.registerContainer}>
        <span className={styles.registerText}>Non sei registrato?</span>
        <Link href="/register" className={styles.registerButton}>
          Crea un account
        </Link>
      </div>
    </div>
  );
}
