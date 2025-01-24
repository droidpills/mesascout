export const parseMarketValue = (value: string): number => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (value.includes("M")) return numericValue * 1_000_000;
    if (value.includes("K")) return numericValue * 1_000;
    return 0;
  };