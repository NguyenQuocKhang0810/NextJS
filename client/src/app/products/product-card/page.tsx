"use client";

import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteProduct } from "@/app/actions/deleteProduct";

export default function ProductCard({
  product,
  index,
}: Readonly<{
  product: Product;
  index: number;
}>) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await deleteProduct(String(product.id));
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <li
      className="transform transition-all duration-300 hover:scale-105 animate-fadeIn"
      style={{ animationDelay: `${0.1 * (index + 1)}s` }}
    >
      <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-none">
        <div className="relative h-48 w-full">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              priority
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No Image</span>
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100 truncate">
            {product.name}
          </CardTitle>
          <CardDescription className="text-lg font-medium text-green-600 dark:text-green-400">
            ${product.price.toLocaleString("en-US")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {product.description || "No description available"}
          </p>
        </CardContent>

        <CardFooter className="flex items-center p-4">
          <Link
            href={`/products/${product.id}`}
            className="flex flex-1 justify-start"
          >
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
          <div className="flex items-center justify-end">
            <Link href={`/products/${product.id}/edit`} className="ml-2">
              <Button
                variant="secondary"
                size="sm"
                className="bg-blue-400 hover:scale-110 transition-transform duration-300 ease-in-out"
              >
                <Pencil />
              </Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              className="ml-3 hover:scale-110 transition-transform duration-300 ease-in-out"
              onClick={handleDelete}
              disabled={isPending}
            >
              <Trash2 />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
}
