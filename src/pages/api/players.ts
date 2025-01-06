import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/droidpills/7a84aadccdb73e59181e7435b28357b4/raw/ce472c19b7f6b96ade46f92c6ecffffbcfa1f2b7/players_scores_with_transfermarkt.json"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    // Retorna os dados como JSON para o cliente
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching players data:", error);
    res.status(500).json({ message: "Failed to fetch players data" });
  }
}