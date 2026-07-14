import { apiFetch } from "@/src/lib/API/client";

// reste password types
interface ResetPasswordPayload {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface RequestsPasswordResponse {
  message: string;
}

//features per reset password
export function resetPassword(payload: ResetPasswordPayload) {
  return apiFetch<RequestsPasswordResponse>("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

//features per forgot password
export function forgotPassword(email: string) {
  return apiFetch<RequestsPasswordResponse>("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({email}),
  });
}
