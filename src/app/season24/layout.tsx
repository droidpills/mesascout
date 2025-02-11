import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Temporada 2024 - Analise jogadores",
    description: "Acompanhe os jogadores mais promissores da temporada",
    openGraph: {
      title: "Temporada 2024 - Analise jogadores",
      description: "Acompanhe os jogadores mais promissores da temporada",
      url: "https://mesascout.vercel.app", 
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
    {children}
  </>;
}
