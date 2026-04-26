"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useCheckAdmin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        const user = await res.json();

        if (user?.roles?.includes("admin")) {
          setIsAdmin(true);
        } else {
          router.push("/");
        }
      } catch (err) {
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  return { loading, isAdmin };
}