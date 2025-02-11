import type { Metadata } from "next";
import { Inter_Tight } from 'next/font/google';
import GoogleAdsense from "./components/GoogleAdsense";
import GoogleAnalytics from "./components/GoogleAnalytics";
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
        <div className="flex w-full bg-[#292C34] p-5">
          <GoogleAdsense pId="3537170918649474" />
        </div>
        <GoogleAnalytics />
        <div>
          {children}
        </div>
        <div className="mt-16 p-5 mb-4 bg-[#292C34] w-full">
          <GoogleAdsense pId="3537170918649474" />
        </div>
        <Footer />
      </body>
    </html>
  );
}
