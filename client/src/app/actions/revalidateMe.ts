"use server";

import { revalidatePath } from "next/cache";

export default async function revalidateMe() {
  revalidatePath("/me");
  return { success: true, message: "Update me successfully" };
}
