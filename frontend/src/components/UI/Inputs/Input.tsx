import { forwardRef, InputHTMLAttributes, ReactNode, useId } from "react";
import styles from "./formElement.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", type, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const isCheckbox = type === "checkbox";

    return (
      // Se è una checkbox, aggiunge la classe .checkboxWrapper
      <div
        className={`${styles.fieldWrapper} ${isCheckbox ? styles.checkboxWrapper : ""}`}
      >
        <label
          htmlFor={inputId}
          className={`${styles.label} ${error ? styles.labelError : ""}`}
        >
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={`${styles.baseInput} ${error ? styles.inputError : ""} ${className}`}
          aria-invalid={!!error}
          {...props}
        />
        {/* L'errore viene renderizzato solo se non è una checkbox (o puoi gestirlo sotto se preferisci) */}
        {error && !isCheckbox && (
          <span className={styles.errorMessage}>{error}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
