"use client";

import classNames from "./deskNavbar.module.css";

import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/src/store/authStore";

export default function DeskNavbar() {
  //authStore
  const { user, isLoading, isAuthenticated, logout, checkAuth } =
    useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  // Se sta ancora controllando i cookie, mostriamo una navbar neutra o uno scheletro
  if (isLoading) {
    return (
      <nav className={classNames.navbar}>
        <div className={classNames.logo}>ProgettoArte</div>
      </nav>
    );
  }

  return (
    <nav className={classNames.navbar}>
      <div className={classNames.logo}>
        <Link href="/" className={classNames.navLink}>
          ProgettoArte
        </Link>
      </div>

      <div className={classNames.navLink}>
        {isAuthenticated ? (
          <div className={classNames.loggedInContainer}>
            <span className={classNames.welcomeText}>SEI LOGGATO!</span>
            {user && <span className={classNames.username}>({user.username})</span>}
            <button onClick={handleLogout} className={classNames.logoutBtn}>
              Esci
            </button>
          </div>
        ) : (
          <div className={classNames.authButtons}>
            <Link href="/login" className={classNames.loginBtn}>
              Accedi
            </Link>
            <Link href="/register" className={classNames.registerBtn}>
              Registrati
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
