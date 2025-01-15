import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5 segundos

    const response = await fetch(
      "https://storage.googleapis.com/mesascout/players_with_positions2.json",
      {
        signal: controller.signal, // Passa o sinal de cancelamento
      }
    );

    clearTimeout(timeoutId); // Cancelar o timeout, se não houver erro

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    // Adiciona headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Retorna os dados como JSON
    res.status(200).json(data);
  } catch (error) {
      console.error(error);
     }
}