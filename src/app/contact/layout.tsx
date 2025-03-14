import { Metadata } from "next";
import Image from "next/image";
import bannerleft from "../../../public/images/banners/banner-left.png"

export const metadata: Metadata = {
  title: "Mesa Scout - Contato",
  description: "Entre em contato com Mesa Scout",
  openGraph: {
    title: "Mesa Scout - Contato",
    description: "Entre em contato com Mesa Scout",
    url: "https://mesascout.vercel.app/about",
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
    <div className="flex container mx-auto lg:gap-x-8">
      <div className="w-full lg:w-9/12">
        {children}
      </div>
      <div className="my-7 sticky top-0 hidden lg:flex lg:flex-row lg:w-3/12">
          <a href="https://www.instagram.com/mesascout/#" target="_blank">
            <Image src={bannerleft} width={380} height={850} alt="Banner Youtube" />
          </ a>
        </div>
    </div>
  </>;
}
