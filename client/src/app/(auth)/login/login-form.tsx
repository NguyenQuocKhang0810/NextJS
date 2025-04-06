"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { toast } from "sonner";
import { useAppContext } from "@/app/app-provider";
import { apiRequest } from "@/lib/http";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setSessionToken } = useAppContext();
  const router = useRouter();

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
      router.refresh();
      router.push("/");
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
    <div className="flex w-full items-center justify-center mt-12">
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
        {/* Animated circular pattern - enlarged */}
        <div className="absolute inset-0 -z-10">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 h-20 w-2.5 origin-center rounded-full bg-[#00d2df]"
              style={{
                transform: `translate(-50%, -50%) rotate(${
                  i * 6
                }deg) translateY(-250px)`,
                opacity: i % 3 === 0 ? 0.9 : 0.6,
                animation: `pulse 4s infinite ${i * 0.06}s`,
                animationDelay: `${i * 0.06}s`,
              }}
            />
          ))}
        </div>

        {/* Form content - centered within the larger circle */}
        <div className="z-10 w-72 space-y-5 text-center">
          <h1 className="text-3xl font-bold text-[#00d2df]">Login</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        className="h-12 rounded-full border-[#2a3a5a] bg-[#1a2237]/80 px-5 text-white placeholder:text-gray-400 focus:border-[#00d2df] focus:ring-[#00d2df]"
                      />
                    </FormControl>
                    <FormMessage className="text-left text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                        className="h-12 rounded-full border-[#2a3a5a] bg-[#1a2237]/80 px-5 text-white placeholder:text-gray-400 focus:border-[#00d2df] focus:ring-[#00d2df]"
                      />
                    </FormControl>
                    <FormMessage className="text-left text-xs text-red-400" />
                  </FormItem>
                )}
              />

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-300 hover:text-[#00d2df] transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-[#00d2df] text-[#1a2237] font-medium hover:bg-[#00c0cc] transition-colors"
              >
                Login
              </Button>
            </form>
          </Form>

          <div className="pt-2">
            <Link
              href="/register"
              className="text-[#00d2df] hover:underline transition-colors text-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
