import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quebrando Ciclo - App Gamificado de Nutrição",
  description: "Aplicativo gamificado para ajudar pessoas a quebrar ciclos de hábitos alimentares ruins e desenvolver uma relação mais saudável com a comida.",
  keywords: ["nutrição", "gamificação", "emagrecimento", "receitas saudáveis", "sucos detox", "plano alimentar"],
  authors: [{ name: "Quebrando Ciclo" }],
  openGraph: {
    title: "Quebrando Ciclo",
    description: "Quebre o ciclo de maus hábitos alimentares com nossa jornada gamificada",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}