import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import Script from "next/script";
import GoogleAdsense from "./components/GoogleAdsense";
import "./styles/globals.css";

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
        <meta name="google-adsense-account" content="ca-pub-3537170918649474"></meta>
      </head>
      <body >
        <Header />

        {/* Banner AdSense */}
        <div className="mt-5 flex w-full p-5">
          <GoogleAdsense/>
        </div>

        <main className="h-full md:px-0 lg:px-4 2xl:px-0">{children}</main>

        {/* Segundo Banner AdSense */}
        <div className="mt-16 p-5 mb-4 bg-[#292C34] w-full">
          <GoogleAdsense />
        </div>

        <Footer />
      </body>
    </html>
  );
}
