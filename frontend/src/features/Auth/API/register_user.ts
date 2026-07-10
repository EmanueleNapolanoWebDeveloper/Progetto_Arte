import { apiFetch } from "@/src/lib/API/client";
import { RegisterFormType } from "../../../types/Auth/Register";

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function registerUser(data: RegisterFormType) {
  return apiFetch<RegisterResponse>("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
