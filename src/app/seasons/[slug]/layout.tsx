import { Metadata } from "next";
import Image from "next/image";

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
       <div className="mt-7 mx-auto flex justify-center lg:container">
        <a href="https://www.youtube.com/@mesascout?sub_confirmation=1" target="_blank" className="hidden lg:block">
          <Image src="/images/banners/banner-top.png" width={1536} height={250} alt="Banner Youtube" />
        </a>
        <a href="https://www.youtube.com/@mesascout?sub_confirmation=1" target="_blank" className="lg:hidden">
          <Image src="/images/banners/banner-mobile.gif" width={300} height={250} alt="Banner Youtube" />
        </a>
      </div>
    <div className="flex container mx-auto lg:gap-x-8">
      <div className="w-full lg:w-9/12">
        {children}
      </div>
      <div className="my-7 sticky top-0 hidden lg:flex lg:flex-row lg:w-3/12">
          <a href="https://www.instagram.com/mesascout/#" target="_blank">
            <Image src="/images/banners/banner-left.png" width={380} height={850} alt="Banner Youtube" />
          </ a>
        </div>
    </div>
  </>;
}
