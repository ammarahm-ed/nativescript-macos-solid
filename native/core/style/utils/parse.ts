export function parsePercent(percentString: string): number {
  if (percentString.endsWith("%")) {
    const numericString = percentString.slice(0, -1);
    const numericValue = parseFloat(numericString);
    if (!isNaN(numericValue)) {
      return numericValue;
    }
  }
  throw new Error("Invalid percent string");
}
