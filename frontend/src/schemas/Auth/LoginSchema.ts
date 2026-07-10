import { z } from "zod";
import { LoginFormType } from "@/src/types/Auth/Login";

export const loginSchema = z.object({
  email: z
  .string()
  .email("Inserisci una mail valida")
  .min(1,"Email è obbligatoria"),

  password: z
    .string()
    .min(1, "La password è obbligatoria")
    .regex(/[A-Z]/, "Deve contenere almeno una lettera maiuscola")
    .regex(/[0-9]/, "Deve contenere almeno un numero"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
