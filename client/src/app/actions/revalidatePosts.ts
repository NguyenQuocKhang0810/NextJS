"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePosts() {
  revalidatePath("/products");
  return { success: true, message: "Dữ liệu bài viết đã được làm mới" };
}
