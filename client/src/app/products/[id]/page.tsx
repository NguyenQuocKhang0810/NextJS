import { apiRequest } from "@/lib/http";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page({
  params,
}: {
  readonly params: { readonly id: string };
}) {
  const { data } = await apiRequest<{ data: any }>(`/products/${params.id}`, {
    method: "GET",
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[500px] h-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-none">
        <div className="relative h-48 w-full">
          {data.image ? (
            <Image
              src={data.image}
              alt={data.name}
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
            {data.name}
          </CardTitle>
          <CardDescription className="text-lg font-medium text-green-600 dark:text-green-400">
            ${data.price.toLocaleString()}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {data.description || "No description available"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
