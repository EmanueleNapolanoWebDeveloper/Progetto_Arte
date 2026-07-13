import { z } from "zod";
import { LoginFormType } from "@/src/types/Auth/Login";

export const loginSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string().min(1, "Password obbligatoria"),
  rememberMe: z.boolean().optional(),
  acceptPrivacy: z.boolean().refine((val) => val === true, {
    message: "Devi accettare la privacy policy per continuare",
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
