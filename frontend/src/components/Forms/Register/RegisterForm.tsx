// components/auth/RegisterForm/RegisterForm.tsx
"use client";

import styles from "./registerForm.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  registerSchema,
  RegisterFormData,
} from "@/src/schemas/Auth/RegisterSchema";

import { registerUser } from "@/src/features/Auth/API/register_user";

import Form from "../../UI/Form/Form";
import Input from "../../UI/Inputs/Input";

export default function RegisterForm() {
  const router = useRouter();

  async function handleRegister(data: RegisterFormData) {
    const result = await registerUser(data);

    if (!result) {
      console.log("Risposta fallita");
      return;
    }

    router.push("/");
  }

  return (
    <div>
      {/* Header del form: eyebrow + titolo + sottotitolo */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>Unisciti a noi</p>
        <h1 className={styles.title}>Crea il tuo account</h1>
        <p className={styles.subtitle}>
          Accedi a migliaia di opere originali, o inizia a vendere i tuoi lavori
          a una community di collezionisti.
        </p>
      </div>

      <Form
        schema={registerSchema}
        defaultValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          password_confirmation: "",
          acceptPrivacy: false,
        }}
        onSubmit={handleRegister}
        submitLabel="Crea account"
        className={styles.form}
      >
        {({ register, formState: { errors } }) => (
          <>
            {/* Sezione: dati personali */}
            <div className={styles.fieldGroup}>
              <p className={styles.groupLabel}>I tuoi dati</p>

              <div className={styles.row}>
                <Input
                  label="Nome"
                  placeholder="Inserisci il tuo nome"
                  autoComplete="name"
                  error={errors.name?.message}
                  {...register("name")}
                />

                <Input
                  label="Username"
                  placeholder="Scegli username"
                  autoComplete="username"
                  error={errors.username?.message}
                  {...register("username")}
                />
              </div>

              <Input
                label="Email"
                type="email"
                placeholder="nome@esempio.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            {/* Sezione: sicurezza account */}
            <div className={styles.fieldGroup}>
              <p className={styles.groupLabel}>Sicurezza</p>

              <Input
                label="Password"
                type="password"
                placeholder="Minimo 8 caratteri"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register("password")}
              />

              <Input
                label="Conferma password"
                type="password"
                placeholder="Ripeti la password"
                autoComplete="new-password"
                error={errors.password_confirmation?.message}
                {...register("password_confirmation")}
              />

              <p className={styles.passwordHint}>
                Usa almeno 8 caratteri, con una combinazione di lettere, numeri
                e simboli per maggiore sicurezza.
              </p>
            </div>

            <Input
              type="checkbox"
              error={errors.acceptPrivacy?.message}
              {...register("acceptPrivacy")}
              label={
                <>
                  Accetto la{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className={styles.inlineLink}
                  >
                    Privacy Policy
                  </Link>
                </>
              }
            />
          </>
        )}
      </Form>

      <div className={styles.loginContainer}>
        <span className={styles.loginText}>Hai già un account?</span>
        <Link href="/login" className={styles.loginButton}>
          Accedi
        </Link>
      </div>
    </div>
  );
}
