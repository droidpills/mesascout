export const normalizeName = (name: string) =>
    name
      .toLowerCase()
      .normalize("NFD") // Remove acentos
      .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos
      .replace(/\s+/g, "-") // Substitui espaços por hifens
      .replace(/[^a-z0-9\-]/g, ""); // 