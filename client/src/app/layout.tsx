import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "./app-provider";
import { cookies } from "next/headers";

const inter = Inter({
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "600", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "SellSphere - Your Shopping Destination",
  description: "Discover the best products at SellSphere",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${inter.variable} min-h-screen flex flex-col`}
      >
        <Toaster />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider initialSessionToken={sessionToken?.value}>
            <Header />
            <main className="flex-1 pt-20">{children}</main>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
