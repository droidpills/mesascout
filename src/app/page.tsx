import { redirect } from 'next/navigation';

export default async function HomePage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getSeasons`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch seasons data: ${response.statusText}`);
  }

  const seasons = await response.json();

  type Season = { sortOrder: number; urlName: string };
  const lowestOrderSeason = seasons.sort((a: Season, b: Season) => a.sortOrder - b.sortOrder)[0];

  if (lowestOrderSeason) {
    redirect(`/seasons/${lowestOrderSeason.urlName}`);
  }

  return <div/>;
}
