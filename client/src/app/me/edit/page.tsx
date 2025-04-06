import React from "react";
import EditForm from "./edit-form";
import { AccountRes, AccountResType } from "@/schemaValidations/account.schema";
import { apiRequest } from "@/lib/http";
import { cookies } from "next/headers";

const EditPage = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  let data: AccountResType = {
    message: "",
    data: { id: 0, name: "", email: "" },
  };

  try {
    const rawData = await apiRequest("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    });
    data = AccountRes.parse(rawData);
    console.log("Fetched data for edit:", data);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <h1>Edit Page</h1>
      <EditForm initialName={data.data.name} />
    </div>
  );
};

export default EditPage;
