"use client";

import { ReactNode } from "react";

type Props = {
  label?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
};

export default function FormField({
  label,
  error,
  required,
  hint,
  children,
}: Props) {
  return (
    <div>
      {label && (
        <label className="block text-gray-700 font-bold mb-2">
          {label}
          {required && " *"}
        </label>
      )}

      {children}

      {hint && !error && (
        <p className="text-xs text-gray-500 mt-1">
          {hint}
        </p>
      )}

      {error && (
        <p
          className="text-sm text-red-600 mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}