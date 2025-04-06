import { apiRequest } from "@/lib/http";
import { ApiResponse, Product } from "@/types/product";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "./product-card/page";

async function fetchProducts() {
  const res: ApiResponse = await apiRequest("/products", {
    method: "GET",
  });

  return {
    data: res.data,
  };
}

export default async function ProductsPage() {
  const { data } = await fetchProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 text-center animate-in slide-in-from-top">
          Products List
        </h1>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((product: Product, index: number) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </ul>

        <div
          className="mt-12 text-center animate-in fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <Button
            asChild
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 "
            style={{ animationDelay: "0.5s" }}
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
