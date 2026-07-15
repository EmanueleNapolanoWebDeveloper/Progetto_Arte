"use client";

import { useState, useTransition } from "react";

interface WorkCardActionsProps {
  workId: string;
  initialSaved?: boolean;
}

export default function WorkCardActions({
  workId,
  initialSaved = false,
}: WorkCardActionsProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();

  function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const next = !saved;
    setSaved(next); // aggiornamento ottimistico

    startTransition(async () => {
      try {
        await fetch(`/api/works/${workId}/save`, {
          method: next ? "POST" : "DELETE",
        });
      } catch {
        setSaved(!next); // rollback in caso di errore
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-pressed={saved}
      aria-label={saved ? "Rimuovi dai preferiti" : "Salva nei preferiti"}
      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--color-primary)] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 disabled:cursor-wait"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={saved ? "var(--color-accent)" : "none"}
        stroke="currentColor"
        strokeWidth="1.75"
      >
        <path d="M12 21s-7.5-4.6-10-9.2C.6 8.1 2.4 4 6.4 4 8.7 4 10.6 5.3 12 7c1.4-1.7 3.3-3 5.6-3 4 0 5.8 4.1 4.4 7.8C19.5 16.4 12 21 12 21z" />
      </svg>
    </button>
  );
}

