import { Metadata } from "next";
import GoogleAdsense from "../components/GoogleAdsense";

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
      <div className="my-7  sticky top-0 bg-[#292C34] flex flex-row lg:w-3/12">
        <GoogleAdsense />
      </div>
    </div>
  </>;
}
