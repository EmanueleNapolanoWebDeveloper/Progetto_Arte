"use client";

import { create } from "zustand";
import { SimpleUser } from "../types/Auth/Login";
import { logoutUser, fetchCurrentUser } from "../features/Auth/API/login_user";

interface AuthState {
  user: SimpleUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;

  setUser: (user: SimpleUser) => void;
  clearUser: () => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,

  setUser: (user) => set({ user, isAuthenticated: true }),

  clearUser: () => set({ user: null, isAuthenticated: false }),

  checkAuth: async () => {
    //se utente già autenticato non fa altra richiesta api
    if (get().isAuthenticated && get().user) return;

    if (get().isLoading) return;
    set({ isLoading: true });

    try {
      const data = await fetchCurrentUser();

      if (data?.user) {
        // Mappiamo l'utente sanificando i potenziali valori null
        const sanitizedUser: SimpleUser = {
          id: data.user.id ?? "", // Se id è null, diventa ""
          name: data.user.name ?? "", // Se name è null, diventa ""
          username: data.user.username ?? "", // Se username è null, diventa ""
          email: data.user.email ?? "", // Se email è null, diventa ""
        };

        set({
          user: sanitizedUser,
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
        });
      } else {
        // Se non c'è l'oggetto user, lo trattiamo come non autenticato
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
        });
      }
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
      });
    }
  },

  logout: async () => {
    try {
      await logoutUser();
    } finally {
      set({
        user: null,
        isAuthenticated: false,
      });
    }
  },
}));
