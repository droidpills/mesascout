export const parseMarketValue = (value: string | null | undefined): number => {
  if (!value || typeof value !== "string") return NaN;

  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  
  if (isNaN(numericValue)) return NaN;

  if (value.includes("M")) return numericValue * 1_000_000;
  if (value.includes("K")) return numericValue * 1_000;

  return numericValue; 
};