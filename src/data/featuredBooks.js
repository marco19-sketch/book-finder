const featuredBooks = [
  {
    id: "featured-1",
    volumeInfo: {
      title: "To Kill a Mockingbird",
      authors: ["Harper Lee"],
      publishedDate: "1960",
      categories: ["Classic", "Fiction"],
      language: "en",
      description:
        "A young girl's view of a small town rocked by injustice and moral struggle, where compassion becomes the true measure of courage.",
      imageLinks: {
        thumbnail:
          "https://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780061120084" }],
    },
    saleInfo: { buyLink: null, listPrice: null },
  },
  {
    id: "featured-2",
    volumeInfo: {
      title: "1984",
      authors: ["George Orwell"],
      publishedDate: "1949",
      categories: ["Dystopian", "Political Fiction"],
      language: "en",
      description:
        "In a future dominated by surveillance, one man fights to preserve truth and freedom in a world where both are forbidden.",
      imageLinks: {
        thumbnail:
          "https://books.google.com/books/content?id=yxv1LK5gyV4C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780451524935" }],
    },
    saleInfo: { buyLink: null, listPrice: null },
  },
  {
    id: "featured-3",
    volumeInfo: {
      title: "Pride and Prejudice",
      authors: ["Jane Austen"],
      publishedDate: "1813",
      categories: ["Romance", "Classic"],
      language: "en",
      description:
        "A sharp and witty dance of manners, love, and ambition, set against the rigid expectations of Regency society.",
      imageLinks: {
        thumbnail:
          "https://books.google.com/books/content?id=f8bGzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780141439518" }],
    },
    saleInfo: { buyLink: null, listPrice: null },
  },
  {
    id: "featured-4",
    volumeInfo: {
      title: "The Great Gatsby",
      authors: ["F. Scott Fitzgerald"],
      publishedDate: "1925",
      categories: ["Classic", "Novel"],
      language: "en",
      description:
        "A glittering tale of wealth and illusion, where dreams shimmer brightly before dissolving into reality.",
      imageLinks: {
        thumbnail:
          "https://books.google.com/books/content?id=s2CkzwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780743273565" }],
    },
    saleInfo: { buyLink: null, listPrice: null },
  },
  {
    id: "featured-5",
    volumeInfo: {
      title: "Moby Dick",
      authors: ["Herman Melville"],
      publishedDate: "1851",
      categories: ["Adventure", "Classic"],
      language: "en",
      description:
        "An unforgiving ocean and a relentless obsession collide in this monumental story of vengeance and fate.",
      imageLinks: {
        thumbnail:
          "https://books.google.com/books/content?id=RzU7vgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9781503280786" }],
    },
    saleInfo: { buyLink: null, listPrice: null },
  },
  {
    id: "featured-6",
    volumeInfo: {
      title: "The Catcher in the Rye",
      authors: ["J.D. Salinger"],
      publishedDate: "1951",
      categories: ["Classic", "Coming-of-Age"],
      language: "en",
      description:
        "A restless teenager wanders through New York City, wrestling with truth, innocence, and the ache of growing up.",
      imageLinks: {
        thumbnail:
          "https://books.google.com/books/content?id=3WJzzgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780316769488" }],
    },
    saleInfo: { buyLink: null, listPrice: null },
  },
  {
    id: "featured-7",
    volumeInfo: {
      title: "Crime and Punishment",
      authors: ["Fyodor Dostoevsky"],
      publishedDate: "1866",
      categories: ["Psychological Fiction", "Classic"],
      language: "ru",
      description:
        "A haunting journey through guilt and redemption, as one man grapples with the weight of his darkest act.",
      imageLinks: {
        thumbnail:
          "https://books.google.com/books/content?id=UvQxAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780140449136" }],
    },
    saleInfo: { buyLink: null, listPrice: null },
  },
  {
    id: "featured-8",
    volumeInfo: {
      title: "The Hobbit",
      authors: ["J.R.R. Tolkien"],
      publishedDate: "1937",
      categories: ["Fantasy", "Adventure"],
      language: "en",
      description:
        "A reluctant hero embarks on a perilous quest, where dragons, treasures, and unexpected courage await.",
      imageLinks: {
        thumbnail:
          "https://books.google.com/books/content?id=8x3w2iCXG0AC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780547928227" }],
    },
    saleInfo: { buyLink: null, listPrice: null },
  },
  {
    id: "featured-9",
    volumeInfo: {
      title: "War and Peace",
      authors: ["Leo Tolstoy"],
      publishedDate: "1869",
      categories: ["Historical Fiction", "Classic"],
      language: "ru",
      description:
        "Love and chaos entwine with war's relentless tide in this sweeping portrait of human destiny.",
      imageLinks: {
        thumbnail:
          "https://books.google.com/books/content?id=ZJYzAQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780199232765" }],
    },
    saleInfo: { buyLink: null, listPrice: null },
  },
  {
    id: "featured-10",
    volumeInfo: {
      title: "Brave New World",
      authors: ["Aldous Huxley"],
      publishedDate: "1932",
      categories: ["Science Fiction", "Dystopian"],
      language: "en",
      description:
        "A chilling vision of engineered happiness and control, where individuality is the ultimate crime.",
      imageLinks: {
        thumbnail:
          "https://books.google.com/books/content?id=3KcOEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780060850524" }],
    },
    saleInfo: { buyLink: null, listPrice: null },
  },
];

export default featuredBooks;
