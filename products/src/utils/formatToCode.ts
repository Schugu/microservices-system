export const formatToCode = (input: string): string => {
  return input
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_");
}

