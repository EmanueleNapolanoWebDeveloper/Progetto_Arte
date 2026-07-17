"use client";

import { useId, useState } from "react";
import styles from "./HowItWork.module.css";

type Step = {
  number: string;
  title: string;
  description: string;
};

type Persona = "buyer" | "artist";

const steps: Record<Persona, Step[]> = {
  buyer: [
    {
      number: "01",
      title: "Esplora e scopri",
      description:
        "Naviga tra migliaia di opere originali selezionate, filtra per stile, tecnica o artista.",
    },
    {
      number: "02",
      title: "Acquista in sicurezza",
      description:
        "Pagamento protetto e certificato di autenticità incluso con ogni opera.",
    },
    {
      number: "03",
      title: "Ricevi a casa",
      description:
        "Spedizione assicurata e imballaggio professionale, direttamente dallo studio dell'artista.",
    },
  ],
  artist: [
    {
      number: "01",
      title: "Crea il tuo profilo",
      description:
        "Racconta la tua storia, carica il tuo portfolio e personalizza la tua vetrina.",
    },
    {
      number: "02",
      title: "Carica le tue opere",
      description:
        "Foto, dimensioni, tecnica e prezzo: pubblica in pochi minuti.",
    },
    {
      number: "03",
      title: "Gestisci ordini e spedizioni",
      description:
        "Ricevi notifiche in tempo reale e organizza la spedizione dalla tua dashboard.",
    },
    {
      number: "04",
      title: "Ricevi i pagamenti",
      description:
        "Incassi trasparenti e diretti, senza sorprese sulle commissioni.",
    },
  ],
};

const personaLabels: Record<Persona, string> = {
  buyer: "Per chi acquista",
  artist: "Per gli artisti",
};

export function HowItWorks() {
  const [activePersona, setActivePersona] = useState<Persona>("buyer");
  const tabListId = useId();

  return (
    <section aria-labelledby="how-it-works-heading" className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Come funziona</p>
        <h2 id="how-it-works-heading" className={styles.title}>
          Semplice, sicuro, trasparente
        </h2>
      </div>

      <div
        role="tablist"
        aria-label="Seleziona percorso"
        id={tabListId}
        className={styles.tabList}
      >
        {(Object.keys(personaLabels) as Persona[]).map((persona) => (
          <button
            key={persona}
            role="tab"
            type="button"
            aria-selected={activePersona === persona}
            aria-controls={`panel-${persona}`}
            id={`tab-${persona}`}
            className={`${styles.tabButton} ${
              activePersona === persona ? styles.tabButtonActive : ""
            }`}
            onClick={() => setActivePersona(persona)}
          >
            {personaLabels[persona]}
          </button>
        ))}
      </div>

      {(Object.keys(steps) as Persona[]).map((persona) => (
        <div
          key={persona}
          role="tabpanel"
          id={`panel-${persona}`}
          aria-labelledby={`tab-${persona}`}
          hidden={activePersona !== persona}
          className={styles.panel}
        >
          <ol className={styles.stepsList}>
            {steps[persona].map((step) => (
              <li key={step.number} className={styles.stepItem}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}