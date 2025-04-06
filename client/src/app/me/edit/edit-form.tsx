"use client";

import React from "react";

import { useAppContext } from "@/app/app-provider";
import { apiRequest } from "@/lib/http";
import {
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import revalidateMe from "@/app/actions/revalidateMe";

interface EditFormProps {
  initialName: string;
}

const EditForm = ({ initialName }: EditFormProps) => {
  const { sessionToken } = useAppContext();
  const router = useRouter();

  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: initialName,
    },
  });

  async function onSubmit(values: UpdateMeBodyType) {
    try {
      const response = await apiRequest("/account/me", {
        method: "PUT",
        body: values,
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });
      toast.success((response as any).message);
      revalidateMe();
      router.push("/me");
    } catch (error) {
      console.log("Failed to fetch:", error);
      toast.error((error as any).message);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditForm;
