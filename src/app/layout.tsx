import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./styles/globals.css";
import 'font-awesome/css/font-awesome.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Header from "./components/layouts/header";
import Footer from "./components/layouts/footer";

const inter = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mesa Scout",
  description:
    "Explore análises de jogadores e quais são as promessas do mercado futebolístico",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.className}>
      <head>
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J2GY2ZHKX8"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-J2GY2ZHKX8', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body >
        <Header />
        <main className="h-full md:px-0 lg:px-4 2xl:px-0">{children}</main>
  
        <Footer />
      </body>
    </html>
  );
}
