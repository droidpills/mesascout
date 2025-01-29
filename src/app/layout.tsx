import type { Metadata } from "next";
import { Inter_Tight } from 'next/font/google';
import "./styles/globals.css";

import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";

const inter = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Mesa Scout",
  description: "Explore analises de jogadores e quais são as promessas do mercado futebolistico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.className}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
