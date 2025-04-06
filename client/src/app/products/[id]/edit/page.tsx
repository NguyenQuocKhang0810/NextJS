// products/[id]/edit/page.tsx
import { cookies } from "next/headers";
import { apiRequest } from "@/lib/http";
import { ProductRes, ProductResType } from "@/schemaValidations/product.schema";
import ProductForm from "../../new/product-form";

export default async function EditProductPage({
  params,
}: {
  readonly params: { id: string };
}) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  let data: ProductResType = {
    message: "",
    data: {
      id: Number(params.id),
      name: "",
      price: 0,
      description: "",
      image: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  try {
    const rawData = await apiRequest(`/products/${params.id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    });
    data = ProductRes.parse(rawData);
    console.log("Fetched product data for edit:", data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-2xl mb-5 text-red-500">Error Loading Product</h1>
        <p>Failed to fetch product data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="text-2xl mb-5">Edit Product</h1>
      <ProductForm
        initialData={{
          name: data.data.name,
          price: data.data.price,
          description: data.data.description,
          image: data.data.image,
        }}
        productId={params.id}
        isEditing={true}
      />
    </div>
  );
}
