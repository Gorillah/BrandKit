import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
import Script from "next/script";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const font = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Make Logo Simple",
  description: "Generate your perfect logo simply with BrandKit",
};

const GTM_ID = "AW-717418224";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <html>
        <script>
          {`
            (window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-717418224')
          `}
        </script>
        <body>...</body>
      </html>
      <ClerkProvider>
        <html lang="en">
          <Provider>
            <body className={cn(font.className)}>
              {children}
              {/* <ReactQueryDevtools /> */}
              <Toaster />
            </body>
          </Provider>
        </html>
      </ClerkProvider>
    </div>
  );
}
