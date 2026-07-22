import { forwardRef, ReactNode, TextareaHTMLAttributes, useId } from "react";
import styles from "./textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: ReactNode;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

    return (
      <div className={styles.fieldWrapper}>
        <label
          htmlFor={textareaId}
          className={`${styles.label} ${error ? styles.labelError : ""}`}
        >
          {label}
        </label>
        <textarea
          id={textareaId}
          ref={ref}
          className={`${styles.baseInput} ${styles.textarea} ${error ? styles.inputError : ""} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />
        {error && (
          <span id={`${textareaId}-error`} className={styles.errorMessage}>
            {error}
          </span>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
export default TextArea;
