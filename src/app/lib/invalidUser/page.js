"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useToast } from "../useToast/useToast";
import Toast from "@/app/componenets/toast/page";

export default function InvalidUser() {
  const router = useRouter();
  const { toast, showToast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          showToast("Please login first", "error");

          setTimeout(() => {
            router.push("/lib/auth/login");
          }, 1500);
        }
      } catch (error) {
        showToast("Server error. Try again", "error");
      }
    };

    checkAuth();
  }, []);

  return <Toast toast={toast} />;
}