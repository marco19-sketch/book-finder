export function scrollup(offset = 400, delay = 50) {
  setTimeout(() => {
    document.body.scrollBy({
      top: offset,
      behavior: "smooth",
    });
  }, delay);
}
