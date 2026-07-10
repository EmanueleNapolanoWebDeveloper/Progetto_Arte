import {z} from "zod";
import { RegisterFormType } from '../../types/Auth/Register';

export const registerSchema = z.object({
    name: z
    .string()
    .min(2, "Il nome deve avere minimo 2 caratteri")
    .max(100, "Il Nome è troppo lungo"),

    username: z
    .string()
    .min(3,"Lo Username deve avere minimo 3 caratteri")
    .max(50, "Username troppo lungo. Massimo 50 caratteri")
    .regex(
        /^[a-zA-Z0-9_]+$/,
        "Lo username può contenere solo lettere, numeri e underscore"
    ),

    email: z
    .string()
    .email('Inserisci una mail valida'),

    password: z
    .string()
    .min(8,"La password deve avere almeno 8 caratteri")
      .regex(/[A-Z]/, "Deve contenere almeno una lettera maiuscola")
      .regex(/[0-9]/, "Deve contenere almeno un numero"),

    password_confirmation: z
    .string(),
})

export type RegisterFormData = z.infer<typeof registerSchema>;