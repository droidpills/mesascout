import { Metadata } from "next";

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
  return <>{children}</>;
}
