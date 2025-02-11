import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesa Scout - Sobre nós",
  description: "Um site que nasceu do amor pelo futebol e a vontade de mostrar de forma prática os jogadores em ascensão",
  openGraph: {
    title: "Mesa Scout - Sobre nós",
    description: "Um site que nasceu do amor pelo futebol e a vontade de mostrar de forma prática os jogadores em ascensão",
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <div className="container mx-auto">
  {children}
  </div>
</>;
}
