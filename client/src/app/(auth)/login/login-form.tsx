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
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { toast } from "sonner";
import { useAppContext } from "@/app/app-provider";
import { apiRequest } from "@/lib/http";

const LoginForm = () => {
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setSessionToken } = useAppContext();

  async function onSubmit(values: LoginBodyType) {
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: values,
      });

      toast.success((data as any).message);

      const resultFromNextServer = await fetch("api/auth", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await resultFromNextServer.json();
      // lưu token bằng useContext để client có thể xác thực và lấy dữ liệu người dùng.
      // Khi người dùng đã đăng nhập thành công, server sẽ trả về token
      // và client sẽ lưu token này vào state để xác thực cho các request sau
      setSessionToken(result.data.token);
    } catch (error) {
      console.log("Failed to fetch:", error);

      if ((error as any).errors && Array.isArray((error as any).errors)) {
        (error as any).errors.forEach(
          (err: { field: string; message: string }) => {
            form.setError(err.field as keyof LoginBodyType, {
              message: err.message,
            });
          }
        );
      } else {
        toast.error((error as any).message);
      }
      console.error(error);
    }
  }

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
