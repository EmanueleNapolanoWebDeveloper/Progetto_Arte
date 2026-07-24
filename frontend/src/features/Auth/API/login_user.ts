import { ApiError, apiFetch } from "@/src/lib/API/client";
import { LoginFormType } from "@/src/types/Auth/Login";

interface LoginResponse {
  user: {
    id: string | null;
    name: string | null;
    username: string | null;
    email: string | null;
  };
}

export async function loginUser(data: LoginFormType) {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  });
}

export async function fetchCurrentUser() {
  try {
    return await apiFetch<LoginResponse>("/user", {
      method: "GET",
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
}

export async function logoutUser() {
  return apiFetch<void>("/logout", {
    method: "POST",
  });
}
