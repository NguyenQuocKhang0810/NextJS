"use client";

import { useAppContext } from "@/app/app-provider";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/http";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const LogoutPage = () => {
  const { sessionToken, setSessionToken } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!sessionToken) {
      toast.error("You are not logged in. Please log in first.");
      router.push("/login");
    }
  }, [sessionToken, router]);

  const handleLogout = async () => {
    try {
      await apiRequest("/auth/logout", {
        method: "POST",
        body: {},
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      setSessionToken("");

      await fetch("/api/auth/logout", {
        method: "POST",
      });
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error) {
      console.error(" Logout failed", error);
      toast.error((error as any).message || "Logout failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1>Do you want to log out?</h1>
      <Button className="cursor-pointer" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default LogoutPage;
