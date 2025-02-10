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
  icons: "/favicon.ico",
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
        <div className="flex container mx-auto lg:gap-x-8">
          <div className="w-full lg:w-9/12">
          {children}
          </div>
          <div className="my-7  sticky top-0  h-screen bg-[#292C34] flex flex-row lg:w-3/12"></div>
          </div>
          <div className="mt-16 mb-4 bg-[#292C34] h-[200px] w-full">
        </div>
        <Footer />
      </body>
    </html>
  );
}
