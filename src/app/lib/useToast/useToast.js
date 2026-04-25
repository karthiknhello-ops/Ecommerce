"use client";
import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "error") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  return { toast, showToast };
}