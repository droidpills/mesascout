import useSeasons from "@/app/hooks/useSeasons";

const seasons = useSeasons();

export async function generateStaticParams() {
   // const season = await fetch(`${seasons.jsonUrl}`).then((res) => res.json())
   
    return seasons.map(({ urlName }: { urlName: string}) => ({
      slug: urlName,
    }))
  }