"use client";

import styles from "./deskNavbar.module.css";

import React, { useEffect, useCallback, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";

import Link from "next/link";

//icone
import { Search, Heart, ShoppingBag, X, ChevronDown } from "lucide-react";

// Definizione delle categorie per scalare facilmente in futuro
const categories = [
  { name: "Quadri", href: "/categorie/quadri" },
  { name: "Sculture", href: "/categorie/sculture" },
  { name: "Fotografia", href: "/categorie/fotografia" },
  { name: "Digitale", href: "/categorie/digitale" },
  { name: "Stampe", href: "/categorie/stampe" },
];

function getInitials(name?: string) {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function DeskNavbar() {
  //prendiamo il pathname per sapere in quale categoria si rova
  const pathName = usePathname();
  const router = useRouter();

  //authStore
  const { user, isLoading, isAuthenticated, logout, checkAuth } =
    useAuthStore();

  //states
  const [isScrolled, setisScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //ref campi input
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  //auth check con gestione errore
  useEffect(() => {
    checkAuth().catch((error) => {
      console.error("Errore durante il controllo dell'autenticazione: ", error);
    });
  }, [checkAuth]);

  //scroll navbar
  useEffect(() => {
    const onScroll = () => setisScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //menu utente
  useEffect(() => {
    if (!isUserMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isUserMenuOpen]);

  //focus su campo di ricerca
  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  // funzioni di callback
  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchValue("");
  }, []);

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Escape") {
      closeSearch();
    } else if (event.key === "Enter" && searchValue.trim()) {
      router.push(`/ricerca?q=${encodeURIComponent(searchValue.trim())}`);
      closeSearch();
    }
  };

  const handleLogout = async () => {
    try {
      setIsUserMenuOpen(false);
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  // Se sta ancora controllando i cookie, mostriamo una navbar neutra o uno scheletro
  if (isLoading) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.leftSection}>
            <span className={styles.logo}>Atelier</span>
            <nav className={styles.nav} aria-hidden="true">
              {categories.map((cat) => (
                <span key={cat.href} className={styles.skeletonLink} />
              ))}
            </nav>
          </div>
          <div className={styles.rightSection} aria-hidden="true">
            <span className={styles.skeletonIcon} />
            <span className={styles.skeletonIcon} />
            <span className={styles.skeletonIcon} />
            <div className={styles.divider} />
            <span className={styles.skeletonAvatar} />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link href="/" className={styles.logo}>
            Atelier
          </Link>

          <nav className={styles.nav} aria-label="Navigazione principale">
            {categories.map((cat) => {
              const isActive = pathName === cat.href;
              return (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={`${styles.navLink} ${isActive ? styles.activeNavLink : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {cat.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={styles.rightSection}>
          {isSearchOpen ? (
            <div className={styles.searchInline}>
              <Search size={18} strokeWidth={1.5} aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Cerca opere, artisti, stili..."
                className={styles.searchInput}
                aria-label="Cerca"
              />
              <button
                type="button"
                className={styles.iconButton}
                onClick={closeSearch}
                aria-label="Chiudi ricerca"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Cerca"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
          )}

          <Link
            href="/preferiti"
            className={styles.iconButton}
            aria-label="Preferiti"
          >
            <Heart size={20} strokeWidth={1.5} />
          </Link>

          <Link
            href="/carrello"
            className={styles.iconButton}
            aria-label="Carrello"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
          </Link>

          <div
            className={styles.divider}
            role="separator"
            aria-orientation="vertical"
          />

          {isAuthenticated && user ? (
            <div className={styles.userMenuWrapper} ref={userMenuRef}>
              <button
                type="button"
                className={styles.avatarButton}
                onClick={() => setIsUserMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isUserMenuOpen}
                aria-label="Menu profilo"
              >
                <span className={styles.avatar}>{getInitials(user.name)}</span>
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className={`${styles.chevron} ${isUserMenuOpen ? styles.chevronOpen : ""}`}
                  aria-hidden="true"
                />
              </button>

              {isUserMenuOpen && (
                <div className={styles.dropdown} role="menu">
                  <Link
                    href="/profilo"
                    className={styles.dropdownItem}
                    role="menuitem"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Il tuo profilo
                  </Link>
                  <Link
                    href="/impostazioni"
                    className={styles.dropdownItem}
                    role="menuitem"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Impostazioni
                  </Link>
                  <button
                    type="button"
                    className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Esci
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className={styles.avatar} title="Accedi">
              Accedi
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
