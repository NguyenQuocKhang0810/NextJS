"use server"; // Đánh dấu file này là Server Action

import { cookies } from "next/headers";
import { apiRequest } from "@/lib/http";
import revalidateProducts from "./revalidateProducts";

export async function deleteProduct(productId: string) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  try {
    await apiRequest(`/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    });
    revalidateProducts();
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Failed to delete product" };
  }
}
