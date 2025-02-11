import { Metadata } from "next";
import GoogleAdsense from "../components/GoogleAdsense";

export const metadata: Metadata = {
  title: "Copinha - Analise jogadores",
  description: "Acompanhe os jogadores da Copinha 2024",
  openGraph: {
    title: "Copinha - Analise jogadores",
    description: "Acompanhe os jogadores da Copinha 2024",
    url: "https://mesascout.vercel.app/copinha",
    siteName: "Mesa Scout",
    images: [
      {
        url: "/images/logo/mesa_logo_Br01.png",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function CopinhaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <div className="flex container mx-auto lg:gap-x-8">
      <div className="w-full lg:w-9/12">
        {children}
      </div>
      <div className="my-7 p-5 sticky top-0 bg-[#292C34] flex flex-row lg:w-3/12">
      <GoogleAdsense pId="3537170918649474"/>
      </div>
    </div>
  </>;
}
