const trendingBooks = [
  {
    id: "featured-1",
    volumeInfo: {
      title: "Project Hail Mary",
      authors: ["Andy Weir"],
      publishedDate: "2021",
      categories: ["Science Fiction", "Thriller"],
      language: "en",
      description: `Ryland Grace awakens alone aboard a spaceship with no memory of his mission or identity, and Earth’s survival hangs in the balance.
Andy Weir’s Project Hail Mary blends meticulous hard-science detail with heartfelt humor and suspense.
Readers follow Grace as he deciphers alien biology, improvises life-saving experiments, and forms a surprising interspecies friendship.
It’s a fast-paced, intelligent story about resilience, curiosity, and the human drive to solve impossible problems.
Weir’s narrative remains grounded in character and wonder, offering both scientific credibility and emotional depth. Perfect for fans of space survival tales.`,
      imageLinks: {
        thumbnail: "https://covers.openlibrary.org/b/isbn/9780593135204-M.jpg",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780593135204" }],
      copiesSold: 5000000,
    },
  },
  {
    id: "featured-2",
    volumeInfo: {
      title: "The Midnight Library",
      authors: ["Matt Haig"],
      publishedDate: "2020",
      categories: ["Fiction", "Fantasy"],
      language: "en",
      description: `Nora Seed, overwhelmed by regret, enters the Midnight Library—a mystical space between life and death containing infinite alternate lives she could have led.
Each book version of herself reveals the consequences of different choices: artistic ambition, family, success, love.
Matt Haig combines magical realism with emotional insight in a story about self-worth, second chances, and the courage to embrace the life you have.
Beautifully written, deeply reflective, and unexpectedly uplifting—a novel that encourages readers to reconsider the value of their own journey.`,
      imageLinks: {
        thumbnail: "https://covers.openlibrary.org/b/isbn/9780525559474-M.jpg",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780525559474" }],
      copiesSold: 9000000,
    },
  },
  {
    id: "featured-3",
    volumeInfo: {
      title: "Where the Crawdads Sing",
      authors: ["Delia Owens"],
      publishedDate: "2018",
      categories: ["Fiction", "Mystery"],
      language: "en",
      description: `Set in the haunting marshlands of North Carolina, this novel follows Kya Clark, a young woman abandoned and raised alone by nature.
When a local man disappears, whispers of suspicion swirl around the “Marsh Girl.”
Delia Owens weaves rich natural imagery with a powerful mystery, exploring isolation, resilience, and the search for connection.
A beautifully atmospheric tale that examines prejudice, forgiveness, and the beauty found in wild places.
An emotional journey that lingers—perfect for fans of lyrical storytelling and suspenseful character-driven fiction.`,
      imageLinks: {
        thumbnail: "https://covers.openlibrary.org/b/isbn/9780735219090-M.jpg",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780735219090" }],
      copiesSold: 10000000,
    },
  },
  {
    id: "featured-4",
    volumeInfo: {
      title: "Atomic Habits",
      authors: ["James Clear"],
      publishedDate: "2018",
      categories: ["Self-help", "Productivity"],
      language: "en",
      description: `James Clear’s Atomic Habits teaches how small behavior changes can yield dramatic results over time.
Learn to break down goals into tiny, repeatable daily actions and redesign your environment to support positive change.
Through real-world examples and psychological insight, Clear outlines proven strategies: habit stacking, temptation bundling, and tracking progress.
It’s a practical, readable guide for anyone seeking sustainable personal or professional improvement.
A transformative roadmap for building better habits, unlocking potential, and mastering the compounding power of consistency.`,
      imageLinks: {
        thumbnail: "https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780735211292" }],
      copiesSold: 20000000,
    },
  },
  {
    id: "featured-5",
    volumeInfo: {
      title: "Educated",
      authors: ["Tara Westover"],
      publishedDate: "2018",
      categories: ["Memoir", "Biography"],
      language: "en",
      description: `Tara Westover’s memoir Educated chronicles her remarkable journey from an isolated childhood in Idaho to earning a PhD from Cambridge.
With no formal schooling, she self-educated while navigating a family shaped by extreme beliefs and survivalist ideology.
Her story examines memory, identity, trauma, and the transformative power of learning.
Raw, honest, and emotionally compelling, the memoir celebrates the courage it takes to forge one’s own path.
An inspiring narrative about education—literal and figurative—that champions resilience, insight, and the pursuit of truth.`,
      imageLinks: {
        thumbnail: "https://covers.openlibrary.org/b/isbn/9780399590504-M.jpg",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780399590504" }],
      copiesSold: 4000000,
    },
  },
  {
    id: "featured-6",
    volumeInfo: {
      title: "The Vanishing Half",
      authors: ["Brit Bennett"],
      publishedDate: "2020",
      categories: ["Fiction", "Historical"],
      language: "en",
      description: `In The Vanishing Half, twin sisters from a Southern Black community follow divergent paths—one embraces her racial identity openly, the other passes as white.
The novel spans decades and explores themes of identity, belonging, race, and the generational impact of family lore.
Bennett’s elegant, empathetic writing probes how personal decisions echo through time.
This emotionally rich narrative highlights the fluidity of identity and the price of secrecy.
A deeply moving literary novel that challenges assumptions and reveals the complexity of self-definition in American society.`,
      imageLinks: {
        thumbnail: "https://covers.openlibrary.org/b/isbn/9780525536291-M.jpg",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780525536291" }],
      copiesSold: null,
    },
  },
  {
    id: "featured-7",
    volumeInfo: {
      title: "Sapiens: A Brief History of Humankind",
      authors: ["Yuval Noah Harari"],
      publishedDate: "2011",
      categories: ["Non-fiction", "History"],
      language: "en",
      description: `Sapiens provides a sweeping narrative of humanity’s history, from prehistoric ancestors to the present.
Yuval Noah Harari offers accessible yet profound insights into how culture, agriculture, science, and capitalism shaped civilization.
He explores the cognitive revolution, the agricultural shift, and the rise of global empires.
The book challenges assumptions about progress, power, and identity and asks what it means to be human today.
A compelling blend of scholarship and storytelling—Sapiens is enlightening, provocative, and deeply engaging for curious minds.`,
      imageLinks: {
        thumbnail: "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780062316097" }],
      copiesSold: 23000000,
    },
  },
  {
    id: "featured-8",
    volumeInfo: {
      title: "The Four Winds",
      authors: ["Kristin Hannah"],
      publishedDate: "2021",
      categories: ["Historical Fiction"],
      language: "en",
      description: `Kristin Hannah’s The Four Winds is an emotional saga set during the Dust Bowl migration.
Elsa Martinelli struggles with drought, poverty, and loss, traveling from Texas to find hope in California.
Hannah’s narrative evokes the era’s hardships while celebrating human perseverance and community bonds.
The novel explores sacrifice, identity, and the pursuit of a future worth fighting for.
With rich characters and vivid historical detail, it’s both heartbreaking and uplifting.
Perfect for readers who seek impactful historical fiction that honors resilience amid adversity.`,
      imageLinks: {
        thumbnail: "https://covers.openlibrary.org/b/isbn/9781250178602-M.jpg",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9781250178602" }],
      copiesSold: 558000,
    },
  },
  {
    id: "featured-9",
    volumeInfo: {
      title: "Becoming",
      authors: ["Michelle Obama"],
      publishedDate: "2018",
      categories: ["Memoir", "Biography"],
      language: "en",
      description: `Becoming, Michelle Obama’s memoir, charts her journey from Chicago’s South Side to the White House.
With warmth and candor, she reflects on education, family, identity, and public service.
Her narrative is deeply personal, exploring both triumph and heartache in the spotlight.
The book inspires with themes of leadership, perseverance, and hope.
Emotionally resonant and socially insightful, it offers readers a window into shaping history through everyday acts of courage.
An uplifting story about empathy, ambition, and the power of community.`,
      imageLinks: {
        thumbnail: "https://covers.openlibrary.org/b/isbn/9781524763138-M.jpg",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9781524763138" }],
      copiesSold: null,
    },
  },
  {
    id: "featured-10",
    volumeInfo: {
      title: "Circe",
      authors: ["Madeline Miller"],
      publishedDate: "2018",
      categories: ["Fantasy", "Mythology"],
      language: "en",
      description: `Circe reimagines the life of the enchantress from Homer’s Odyssey with a feminist lens.
Madeline Miller humanizes a minor mythological figure—her struggles, power, and transformation become deeply relatable.
Set among gods and monsters, Circe charts themes of exile, motherhood, and self‑belief.
Lyrical prose meets a powerful character arc in a mythic world alive with emotion and magic.
A beautifully crafted novel that bridges ancient legend and modern storytelling.
Ideal for readers captivated by immersive world-building and introspective, mythic fiction.`,
      imageLinks: {
        thumbnail: "https://covers.openlibrary.org/b/isbn/9780316556347-M.jpg",
      },
      industryIdentifiers: [{ type: "ISBN_13", identifier: "9780316556347" }],
      copiesSold: null,
    },
  },
];

export default trendingBooks;
