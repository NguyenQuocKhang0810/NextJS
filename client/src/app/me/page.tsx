import { cookies } from "next/headers";
import React from "react";
import Profile from "./profile";
import { apiRequest } from "@/lib/http";

const MeProfile = async () => {
  const cookieStore = await cookies(); // chỉ hoạt động ở server-side
  const sessionToken = cookieStore.get("sessionToken");

  let data: any = null;

  try {
    data = await apiRequest("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }

  return (
    <div>
      <Profile />
      <p>Username: {data?.data?.name}</p>
    </div>
  );
};

export default MeProfile;
