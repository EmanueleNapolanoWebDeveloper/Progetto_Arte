import { apiFetch } from "@/src/lib/API/client";
import { LoginFormType } from "@/src/types/Auth/Login";

interface LoginResponse {
  user: {
    id: string | null;
    name: string | null;
    username: string | null;
    email: string | null;
  };
  status: number;
}

export async function loginUser(data: LoginFormType) {
  return apiFetch<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchCurrentUser() {
  const res = await apiFetch<LoginResponse>("/user", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  //--->controllo status

  //non autenticato
  if (res.status === 401) {
    return null;
  }

  //errore nel recupero utente
  if (res.status !== 200) {
    throw new Error(`Errore nel recupero dell'utente: ${res.status}`);
  }

  //ritorno
  return res;
}

export async function logoutUser() {
  return apiFetch<void>("/logout", {
    method: "POST",
  });
}
