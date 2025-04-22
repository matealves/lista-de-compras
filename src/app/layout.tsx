import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de Compras",
  description: "Gerenciar suas compras com facilidade.",
  icons: {
    icon: "/file.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/file.svg" type="image/svg" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>{children}</body>
    </html>
  );
}
