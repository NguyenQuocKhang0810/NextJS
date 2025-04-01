"use client";

import { redirect, useRouter } from "next/navigation";

const isAuth = false;
const ButtonRedirect = () => {
  const router = useRouter();

  if (!isAuth) {
    redirect("/register");
  }

  const handleRegister = () => {
    router.push("/register");
  };

  return <button onClick={handleRegister}>Chuyen sang trang Register</button>;
};

export default ButtonRedirect;
