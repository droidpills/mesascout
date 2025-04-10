import { Metadata } from "next";
import Image from "next/image";

type Season = {
  urlName: string;
  name: string;
  metaDescription: string;
  sortOrder: number
};


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const  {slug}  = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getSeasons`);
  const seasons: Season[] = await response.json();
  const season = seasons.find((s) => s.urlName === slug);

  if (!season) {
    throw new Error(`Season not found for slug: ${slug}`);
  }

  return {
    title: `${season.name} - Análise de Jogadores`,
    description: season.metaDescription,
    openGraph: {
      title: `${season.name} - Análise de Jogadores`,
      description: season.metaDescription,
      url: `https://mesascout.com.br/seasons/${season.urlName}`,
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
}

export default function Layout({
    children,
}: {  
  children: React.ReactNode;
}) {return <>
    <div className="mt-7 mx-auto flex justify-center lg:container">
      <a href="https://www.youtube.com/@mesascout?sub_confirmation=1" target="_blank" className="hidden lg:block">
        <Image src={'/images/banners/banner-top.png'} width={1536} height={250} alt="Banner Youtube" />
      </a>
      <a href="https://www.youtube.com/@mesascout?sub_confirmation=1" target="_blank" className="lg:hidden">
        <Image src={'/images/banners/banner-mobile.png'} width={300} height={250} alt="Banner Youtube" />
      </a>
    </div>
    <div className="flex mx-auto lg:container lg:gap-x-8">
      <div className="w-full mx-auto w-12/12 lg:w-9/12">
        {children}
      </div>

      <div className="my-7 sticky top-0 hidden lg:flex lg:flex-row lg:w-3/12">
        <a href="https://www.instagram.com/mesascout/#" target="_blank">
          <Image src={'/images/banners/banner-left.png'} width={380} height={850} alt="Banner Youtube" />
        </ a>
      </div>
    </div>
  </>;
}