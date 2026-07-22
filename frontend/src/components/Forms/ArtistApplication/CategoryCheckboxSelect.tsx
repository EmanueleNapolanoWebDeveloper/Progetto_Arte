"use client";

import React, { useMemo, useState, useId } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";

import type { CategoryOption } from "@/src/types/Category/categoryTypes";
import styles from "./artist_application.module.css";

type Props<TFieldValues extends FieldValues> = {
  categories: CategoryOption[];
  name: FieldPath<TFieldValues>;
  label?: string;
  error?: string;
  control: Control<TFieldValues>;
};

export function CategoryCheckboxSelect<TFieldValues extends FieldValues>({
  categories = [],
  name,
  label,
  error,
  control,
}: Props<TFieldValues>) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: [] as unknown as TFieldValues[FieldPath<TFieldValues>],
  });

  const selected: string[] = (value as string[]) ?? [];
  const fieldsetId = useId();
  const errorId = `${fieldsetId}-error`;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("");

  // Raggruppa le categorie gestendo eventuali fallback per parentName mancanti
  const groupedCategories = useMemo(() => {
    return categories.reduce<Record<string, CategoryOption[]>>((acc, cat) => {
      const parentKey =
        cat.parentName && cat.parentName.trim() !== ""
          ? cat.parentName
          : "Altro";
      (acc[parentKey] ??= []).push(cat);
      return acc;
    }, {});
  }, [categories]);

  const groupNames = useMemo(
    () => Object.keys(groupedCategories),
    [groupedCategories],
  );

  // Tab attiva: usiamo la tab selezionata dall'utente oppure la prima disponibile (State Fallback senza useEffect)
  const activeTab = selectedTab || (groupNames[0] ?? "");

  const isSearching = searchTerm.trim().length > 0;

  // Risultati ricerca globale
  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return categories.filter((cat) => cat.name.toLowerCase().includes(term));
  }, [categories, searchTerm]);

  // Gestione selezioni
  const toggleCategory = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((v) => v !== id)
      : [...selected, id];
    onChange(next);
  };

  const removeCategory = (id: string) => {
    onChange(selected.filter((v) => v !== id));
  };

  const clearAll = () => onChange([]);

  const findCategoryName = (id: string) =>
    categories.find((cat) => cat.id === id)?.name ?? id;

  // Opzioni del gruppo attualmente visibile
  const activeOptions = groupedCategories[activeTab] ?? [];
  const isAllActiveGroupSelected =
    activeOptions.length > 0 &&
    activeOptions.every((opt) => selected.includes(opt.id));

  const toggleActiveGroup = () => {
    const activeIds = activeOptions.map((opt) => opt.id);
    if (isAllActiveGroupSelected) {
      onChange(selected.filter((id) => !activeIds.includes(id)));
    } else {
      const merged = new Set([...selected, ...activeIds]);
      onChange(Array.from(merged));
    }
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.mainLabel}>{label}</label>}

      <div
        className={`${styles.card} ${error ? styles.cardError : ""}`}
        id={fieldsetId}
      >
        {/* Top Bar: Ricerca e Contatore */}
        <div className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca specializzazione..."
              className={styles.searchInput}
            />
            {searchTerm && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setSearchTerm("")}
              >
                ×
              </button>
            )}
          </div>

          {selected.length > 0 && (
            <div className={styles.topBarActions}>
              <span className={styles.counterBadge}>
                {selected.length} selezionat{selected.length === 1 ? "o" : "i"}
              </span>
              <button
                type="button"
                onClick={clearAll}
                className={styles.clearAllBtn}
              >
                Svuota
              </button>
            </div>
          )}
        </div>

        {/* Anteprima Badge Selezionati */}
        {selected.length > 0 && (
          <div className={styles.chipsRow}>
            {selected.map((id) => (
              <span key={id} className={styles.chip}>
                {findCategoryName(id)}
                <button
                  type="button"
                  onClick={() => removeCategory(id)}
                  aria-label={`Rimuovi ${findCategoryName(id)}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {/* CONTENUTO PRINCIPALE */}
        {isSearching ? (
          /* Modalità Vista Ricerca */
          <div className={styles.searchResultsContainer}>
            {searchResults.length === 0 ? (
              <p className={styles.emptyText}>
                Nessuna categoria trovata per &quot;{searchTerm}&quot;
              </p>
            ) : (
              <div className={styles.gridContainer}>
                {searchResults.map((cat) => {
                  const isChecked = selected.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`${styles.tile} ${
                        isChecked ? styles.tileActive : ""
                      }`}
                      onClick={() => toggleCategory(cat.id)}
                    >
                      <div className={styles.tileCheck}>{isChecked && "✓"}</div>
                      <div className={styles.tileText}>
                        <span className={styles.tileName}>{cat.name}</span>
                        <span className={styles.tileParent}>
                          {cat.parentName}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Modalità Layout 2 Colonne (Tab + Grid) */
          <div className={styles.splitLayout}>
            {/* Colonna Sinistra: Tabs Macro-categorie */}
            <div className={styles.tabSidebar}>
              {groupNames.map((group) => {
                const groupCount = groupedCategories[group].filter((cat) =>
                  selected.includes(cat.id),
                ).length;

                return (
                  <button
                    key={group}
                    type="button"
                    className={`${styles.tabBtn} ${
                      activeTab === group ? styles.tabBtnActive : ""
                    }`}
                    onClick={() => setSelectedTab(group)}
                  >
                    <span>{group}</span>
                    {groupCount > 0 && (
                      <span className={styles.tabCount}>{groupCount}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Colonna Destra: Griglia Sottocategorie */}
            <div className={styles.contentArea}>
              <div className={styles.contentHeader}>
                <span className={styles.groupTitle}>{activeTab}</span>
                {activeOptions.length > 0 && (
                  <button
                    type="button"
                    className={styles.selectAllGroupBtn}
                    onClick={toggleActiveGroup}
                  >
                    {isAllActiveGroupSelected
                      ? "Deseleziona tutti"
                      : "Seleziona tutti"}
                  </button>
                )}
              </div>

              <div className={styles.gridContainer}>
                {activeOptions.map((cat) => {
                  const isChecked = selected.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`${styles.tile} ${
                        isChecked ? styles.tileActive : ""
                      }`}
                      onClick={() => toggleCategory(cat.id)}
                    >
                      <div className={styles.tileCheck}>{isChecked && "✓"}</div>
                      <span className={styles.tileName}>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p id={errorId} className={styles.errorMessage}>
          {error}
        </p>
      )}
    </div>
  );
}
