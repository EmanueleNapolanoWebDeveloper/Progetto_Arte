import { apiFetch } from "@/src/lib/API/client";

// Risposta attesa dal tuo VerifyEmailController di Laravel
interface VerifyEmailResponse {
  message: string;
}

export function verifyEmailUser(token: string) {
  return apiFetch<VerifyEmailResponse>("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}
