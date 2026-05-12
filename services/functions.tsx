export const getYear = (dateString?: string) => {
  if (!dateString) return null;

  // Try native Date parsing first
  const parsed = new Date(dateString);

  if (!isNaN(parsed.getTime())) {
    return parsed.getFullYear();
  }

  // Fallback: extract 4-digit year
  const match = dateString.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);

  return match ? match[0] : null;
};
