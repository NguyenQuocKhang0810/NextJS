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

// Define a type for a single product response
export type SingleProductResponse = { data: Product };

// Define a type for a list of products response
export interface ApiResponse {
  data: Product[];
}
