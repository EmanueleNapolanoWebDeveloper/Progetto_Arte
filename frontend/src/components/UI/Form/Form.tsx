"use client";

import { useState, ReactNode } from "react";
import {
  useForm,
  UseFormReturn,
  FieldValues,
  DefaultValues,
  Path,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { ApiError } from "@/src/lib/API/client";
import Button from "../Buttons/button";
import styles from "./form.module.css";

interface FormProps<T extends FieldValues> {
  // Input generic esplicitato: senza .transform(), Input === Output === T
  schema: ZodType<T, T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T, formMethods: UseFormReturn<T>) => Promise<void> | void;
  submitLabel: string;
  children: (methods: UseFormReturn<T>) => ReactNode;
  className?: string;
}

export default function Form<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  submitLabel,
  children,
  className = "",
}: FormProps<T>) {
  const [apiError, setApiError] = useState<string | null>(null);

  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleFormSubmit = async (data: T) => {
    setApiError(null);
    try {
      await onSubmit(data, methods);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 422 && err.errors) {
          Object.entries(err.errors).forEach(([field, messages]) => {
            methods.setError(field as Path<T>, {
              type: "server",
              message: messages[0],
            });
          });
        }
        setApiError(err.message);
        return;
      }
      setApiError(
        "Impossibile contattare il server. Controlla la connessione!",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`${styles.form} ${className}`}
      noValidate
    >
      {apiError && (
        <div className={styles.apiError} role="alert">
          {apiError}
        </div>
      )}

      {children(methods)}

      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        className={styles.submitButton}
      >
        {submitLabel}
      </Button>
    </form>
  );
}
