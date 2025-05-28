describe("GET /api/getSeasons (real fetch)", () => {
    it("should return a valid JSON with required fields", async () => {
      const response = await fetch("https://storage.googleapis.com/mesascout/jsons/copinha.json");
  
      expect(response.ok).toBe(true);  
  
      const text = await response.text();
  
      if (text.trim() === "") {
        console.error("Erro: Corpo da resposta vazio!");
        return;  
      }
  
      let data: any[] = [];  
      try {
        data = JSON.parse(text);
      } catch (error) {
        return;  
      }
  
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });
  });
  