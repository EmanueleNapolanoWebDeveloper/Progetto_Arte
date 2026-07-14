"use client";

// CSS
import styles from "./loginForm.module.css";

// HOOKS
import { useRouter } from "next/navigation";
import Link from "next/link";

// ZOD & SCHEMAS
import { loginSchema, LoginFormData } from "@/src/schemas/Auth/LoginSchema";

// STORE
import { useAuthStore } from "@/src/store/authStore";

// FEATURES
import { loginUser } from "@/src/features/Auth/API/login_user";

// COMPONENTI RIUTILIZZABILI
import Form from "../../UI/Form/Form"; // adatta il percorso in base a dove si trova il componente Form
import Input from "../../UI/Inputs/Input";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  // La logica di invio dati pulita: il try/catch e gli errori 422 sono gestiti dal guscio Form
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
      {/* Sfruttiamo le Render Props espandendo i metodi utili (register ed errors) */}
      {({ register, formState: { errors } }) => (
        <>
          {/* Campo Email */}
          <Input
            label="Email"
            type="email"
            placeholder="nome@esempio.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Campo Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Inserisci la tua password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* CheckBox Remember Me */}
          <Input
            type="checkbox"
            label="Ricordami"
            {...register("rememberMe")}
          />

          {/* Link forgot-password */}
          <Link href="/forgot-password" className={styles.forgotPasswordLink}>
            Password dimenticata?
          </Link>

          {/*Invito alla Registrazione */}
          <div className={styles.registerContainer}>
            <span className={styles.registerText}>Non sei registrato?</span>
            <Link href="/register" className={styles.registerButton}>
              Crea un account
            </Link>
          </div>
        </>
      )}
    </Form>
  );
}
