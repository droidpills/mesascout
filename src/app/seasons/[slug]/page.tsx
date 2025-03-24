export default async function generateStaticParams() {
   const seasons = await fetch('http://localhost:3000/api/getSeasons').then((res) => res.json())
   
    return seasons.map(({ urlName }: { urlName: string}) => ({
      slug: urlName,
    }))

    , []}

