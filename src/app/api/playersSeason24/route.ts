import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5 segundos

    const response = await fetch(
      "https://storage.googleapis.com/mesascout/players_with_positions.json",
      {
        signal: controller.signal, // Passa o sinal de cancelamento
      }
    );

    clearTimeout(timeoutId); // Cancelar o timeout, se não houver erro

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();

    // Adiciona headers CORS e retorna os dados
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred while fetching data.' },
      { status: 500 }
    );
  }
}