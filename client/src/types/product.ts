import { UpdateProductBodyType } from "@/schemaValidations/product.schema";

// Define the Product interface
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormProps {
  initialData?: UpdateProductBodyType; // Dữ liệu ban đầu cho update
  productId?: string; // ID sản phẩm khi update
  isEditing?: boolean; // Phân biệt create hay update
}

// Define a type for a list of products response
export interface ApiResponse {
  data: Product[];
}

// Define a type for a single product response
export type SingleProductResponse = { data: Product };
