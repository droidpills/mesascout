// __tests__/api/getSeasons.mock.test.ts

import { GET } from "@/app/api/getSeasons/route";
import { getDocs } from "firebase/firestore";

jest.mock('next/server', () => ({
  NextResponse: {
    json: (data: any, init?: any) => ({
      data,
      status: init?.status || 200,
    }),
  },
}));

jest.mock("@/lib/firebaseConfig", () => ({
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(() => {}),
  getDocs: jest.fn(),
}));

describe("GET /api/getSeasons (mocked fetch)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return player data for a valid season", async () => {
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          name: "Player One",
          position: "Forward",
          score: 75,
          link: "http://playerone.com",
          club: "FC Example",
          previous_club: "Old Club",
          league: "Premier League",
          hired: true,
          contrato: "2025-06-30",
          games: 25,
          age: 27,
          value: "€50M",
          video: "http://video.com/playerone",
          pontos_fortes: "Speed, Agility",
          pontos_fracos: "Passing",
          prox_adversario: "Team B",
        },
      ],
    } as any);

    (getDocs as jest.Mock).mockResolvedValueOnce({
      docs: [
        {
          id: "season1",
          data: () => ({
            urlName: "season-one",
            name: "Season One",
            description: "First season",
            jsonUrl: "http://fake-json-url.com/players.json",
          }),
        },
      ],
    });

    const request = new Request("http://localhost/api/getSeasons?season=season-one");
    const response = await GET(request);
    const data = response.data.data;

    expect(response.status).toBe(200);
    expect(data).toHaveLength(1); 
    expect(data[0]).toMatchObject({
      name: "Player One",
      position: "Forward",
      score: 75,
      link: "http://playerone.com",
      club: "FC Example",
    });
    expect(response.data.seasonMeta.name).toBe("Season One");

    mockFetch.mockRestore();
  });
});
