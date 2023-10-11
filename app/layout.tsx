import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const font = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Make Logo Simple",
  description: "Generate your perfect logo simply with BrandKit",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Provider>
          <body className={cn(font.className)}>
            {children}
            <ReactQueryDevtools />
            <Toaster />
          </body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
