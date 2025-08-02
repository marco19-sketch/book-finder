export function getAmazonLink(book) {
  const identifiers = book.volumeInfo?.industryIdentifiers || [];
  const isbn13 = identifiers.find(id => id.type === "ISBN_13")?.identifier || "";
  const isbn10 = identifiers.find(id => id.type === "ISBN_10")?.identifier || "";
  const isbn = isbn13 || isbn10;
  return isbn ? `https://www.amazon.it/s?k=${isbn}` : "";
}
