import { forwardRef, ReactNode, SelectHTMLAttributes, useId } from "react";
import styles from "./formElement.module.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, className = "", id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
      <div className={styles.fieldWrapper}>
        <label
          htmlFor={selectId}
          className={`${styles.label} ${error ? styles.labelError : ""}`}
        >
          {label}
        </label>
        <select
          id={selectId}
          ref={ref}
          className={`${styles.baseInput} ${styles.select} ${error ? styles.inputError : ""} ${className}`}
          aria-invalid={!!error}
          {...props}
        >
          {children}
        </select>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

Select.displayName = "Select";
export default Select;
