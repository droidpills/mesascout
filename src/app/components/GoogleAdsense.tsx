"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>; 
  }
}


const GoogleAdsense: React.FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    try {
      if (!window.adsbygoogle) {
        window.adsbygoogle = []; 
      }
      window.adsbygoogle.push({}); 
    } catch (e) {
      console.error("Erro ao carregar o Google AdSense", e);
    }
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3537170918649474`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default GoogleAdsense;
