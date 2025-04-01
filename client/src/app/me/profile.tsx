"use client";

import { useEffect } from "react";
import { useAppContext } from "../app-provider";
import { apiRequest } from "@/lib/http";

const Profile = () => {
  const { sessionToken } = useAppContext();
  useEffect(() => {
    const fetchRequest = async () => {
      let data: any = null;

      try {
        const data = await apiRequest("/account/me", {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequest();
  }, [sessionToken]);
  return <div>Profile</div>;
};

export default Profile;
