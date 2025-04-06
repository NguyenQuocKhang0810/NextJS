"use server";

import { revalidatePath } from "next/cache";

export default async function revalidateProducts() {
  revalidatePath("/products");
  return { success: true, message: "The article data has been refreshed." };
}
