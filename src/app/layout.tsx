import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shadcn Theme Generator",
  description: "Generate random themes for your website. Experience the ultimate in design customization with our premium theme editor. Create stunning, harmonious color schemes with unparalleled precision.",
  metadataBase: new URL("https://shadcnthemes.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
