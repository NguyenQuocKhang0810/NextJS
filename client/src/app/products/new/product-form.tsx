"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/http";
import { toast } from "sonner";
import {
  CreateProductBody,
  CreateProductBodyType,
} from "@/schemaValidations/product.schema";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/app-provider";
import { useEffect, useState } from "react";
import revalidateProducts from "@/app/actions/revalidateProducts";
import { ProductFormProps } from "@/types/product";

const ProductForm = ({
  initialData,
  productId,
  isEditing = false,
}: ProductFormProps) => {
  const { sessionToken } = useAppContext();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!sessionToken) {
      toast.error("You are not logged in. Please log in first.");
      router.push("/login");
    }
  }, [sessionToken, router]);

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: initialData || {
      name: "",
      price: 1,
      description: "",
      image: "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiRequest("/media/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const imageUrl = (response as any)?.data;
      form.setValue("image", imageUrl); // Set the image URL in the form
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error((error as any).message);
    } finally {
      setUploading(false);
    }
  };

  async function onSubmit(values: CreateProductBodyType) {
    try {
      const url = isEditing ? `/products/${productId}` : "/products";
      const method = isEditing ? "PUT" : "POST";

      const data = await apiRequest(url, {
        method,
        body: values,
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      toast.success((data as any).message);
      revalidateProducts();
      router.push("/products");
    } catch (error) {
      console.error(
        `Failed to ${isEditing ? "update" : "create"} product:`,
        error
      );
      toast.error((error as any).message);
    }
  }

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Upload Image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </FormControl>
                {field.value && (
                  <p className="text-sm text-gray-500 mt-2">
                    Uploaded image URL: {field.value}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
            disabled={uploading}
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
