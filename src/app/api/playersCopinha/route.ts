import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5 segundos

    const response = await fetch(
      "https://storage.googleapis.com/mesascout/jsons/copinha.json",
      {
        signal: controller.signal, // Passa o sinal de cancelamento
      }
    );

    clearTimeout(timeoutId); // Cancela o timeout, se não houver erro

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const allPlayers = await response.json();

    // Obtenha os parâmetros de consulta
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || 1); // Página atual
    const pageSize = allPlayers.length
    
    // Paginação
    const startIndex = (page - 1) * pageSize;
    const paginatedPlayers = allPlayers.slice(startIndex, startIndex + pageSize);

    // Retorna os dados paginados e o total
    return NextResponse.json(
      {
        data: paginatedPlayers,
        total: allPlayers.length,
        page,
        pageSize,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching data." },
      { status: 500 }
    );
  }
}
