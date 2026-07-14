"use client";

// CSS
import styles from "./registerForm.module.css";

// HOOKS
import { useRouter } from "next/navigation";
import Link from "next/link";

// ZOD & SCHEMAS
import {
  registerSchema,
  RegisterFormData,
} from "@/src/schemas/Auth/RegisterSchema";

// FEATURES
import { registerUser } from "@/src/features/Auth/API/register_user";

// COMPONENTI RIUTILIZZABILI
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
      submitLabel="Registrati"
      className={styles.form}
    >
      {/* Estraiamo le props necessarie usando le Render Props */}
      {({ register, formState: { errors } }) => (
        <>
          <h3 className={styles.title}>Registrazione</h3>

          {/* Campo Nome */}
          <Input
            label="Nome"
            placeholder="Inserisci il tuo nome"
            error={errors.name?.message}
            {...register("name")}
          />

          {/* Campo Username */}
          <Input
            label="Username"
            placeholder="Scegli Username"
            error={errors.username?.message}
            {...register("username")}
          />

          {/* Campo Email */}
          <Input
            label="Email"
            type="email"
            placeholder="nome@esempio.com"
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Campo Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Minimo 8 Caratteri"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Campo Conferma Password */}
          <Input
            label="Conferma Password"
            type="password"
            placeholder="Ripeti la Password"
            error={errors.password_confirmation?.message}
            {...register("password_confirmation")}
          />

          {/* Campo Accettazione Privacy */}
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
                  className="underline hover:text-[var(--color-accent)]"
                >
                  Privacy Policy
                </Link>
              </>
            }
          />
        </>
      )}
    </Form>
  );
}
