import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { AppProvider } from "@/components/providers/app-provider";
import { THEME_VARS } from "@/theme/color";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akij Resource",
  description: "Online Assessment Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        style={THEME_VARS}
        className="min-h-full bg-(--color-background) text-(--color-foreground)"
      >
        <AppProvider>
          <div className="flex min-h-screen flex-col">
            <AppHeader />
            <div className="flex flex-1 flex-col pt-18">{children}</div>
            <AppFooter />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
