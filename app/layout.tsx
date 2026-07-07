import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { CartProvider } from "@/lib/context/CartContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AutoService",
    template: "%s | AutoService",
  },
  description: "Професійний автосервіс України",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-gray-100">
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <Header />

              <main className="flex-1">
                {children}
              </main>

              <Footer />
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>

        <Toaster
          richColors
          position="top-right"
        />
      </body>
    </html>
  );
}