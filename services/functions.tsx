export const getYear = (dateString?: string) => {
  if (!dateString) return null;

  // Try native Date parsing first
  const parsed = new Date(dateString);

  if (!isNaN(parsed.getTime())) {
    return parsed.getFullYear() + 1;
  }

  // Fallback: extract 4-digit year
  const match = dateString.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);

  //console.log(match, dateString);

  return match ? match[0] : null;
};

export const findBookInShelve = (id, data) => {
  return data.find((item) => item.books.some((book) => book.bookid === id))
    ?.shelve;
};

export const findBookInLists = (id, data) => {
  return data
    .filter((item) => item.books.some((book) => book.bookid === id)) // 1. Filter all matches
    .map((item) => item.listid);
};
