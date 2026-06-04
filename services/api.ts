import { BASE_URL } from "../constants/urls";

export const fetchBooks = async (path: String) => {
  // /trending/now.json?&sort=trending&limit=10
  const endpoint = `${BASE_URL}${path}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      // @ts-ignore
      //throw new Error("Failed to fetch books", response.statusText);
      return { success: false, error: "Error fetching book data" };
    }

    const data = await response.json();

    return { success: true, data: data.works };
  } catch (err) {
    return { success: false, error: "Error fetching book data" };
  }
};

export const fetchBooksSubject = async (path: String) => {
  // /trending/now.json?&sort=trending&limit=10
  const endpoint = `${BASE_URL}${path}`;

  //console.log(endpoint);

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      // @ts-ignore
      return { success: false, error: "Error fetching subject data" };
    }

    const data = await response.json();

    return { success: true, data: data.works, work_count: data.work_count };
  } catch (err) {
    return { success: false, error: "Error fetching subject data" };
  }
};

export const fetchBookDetails = async (workId: String, type: String) => {
  //console.log("api", workId);
  const endpoint = `${BASE_URL}/${type}/${workId}.json`; //https://openlibrary.org/works/OL82563W.json

  //console.log(endpoint);

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      // @ts-ignore
      return { success: false, error: "Error fetching book details data" };
    }

    const dataDetails = await response.json();

    //console.log(dataDetails);

    if (type === "works") {
      const authors = [];
      const authorImages = [];
      const authorData = await Promise.all(
        dataDetails?.authors?.map(async (item) => {
          const authorKey = item.author.key; // e.g., "/authors/OL23919A"
          const endpointAuthor = `${BASE_URL}${authorKey}.json`;

          const response = await fetch(endpointAuthor);
          const data = await response.json();
          return {
            name: data.name,
            //image: data.photos?.[0],
            key: authorKey,
          }; // returns each author's JSON
        }) || [],
      );

      //console.log(authorData);

      dataDetails["authorDetails"] = authorData;
    }

    //console.log("aqui");

    if (type === "books") {
      const authors = [];
      const authorImages = [];
      const authorData = await Promise.all(
        dataDetails?.authors?.map(async (item) => {
          const authorKey = item.key; // e.g., "/authors/OL23919A"
          const endpointAuthor = `${BASE_URL}${authorKey}.json`;

          const response = await fetch(endpointAuthor);
          const data = await response.json();
          return {
            name: data.name,
            //image: data.photos?.[0],
            key: authorKey,
          }; // returns each author's JSON
        }) || [],
      );

      //console.log(authorData);

      if (authorData.length !== 0) {
        dataDetails["authorDetails"] = authorData;
      }
    }

    //console.log(dataDetails);

    //console.log("return");

    return { success: true, data: dataDetails };
  } catch (err) {
    return { success: false, error: "Error fetching book details data" };
  }
};

export const fetchBookEditions = async (
  workId: String,
  limit = 10,
  offset = 0,
) => {
  try {
    const endpoint = `${BASE_URL}/works/${workId}/editions.json?limit=${limit}&offset=${offset}`; //https://openlibrary.org/works/OL82563W.json

    const response = await fetch(endpoint);

    if (!response.ok) {
      // @ts-ignore
      return { success: false, error: "Error fetching book editions data" };
    }

    const dataEditions = await response.json();

    return {
      success: true,
      data: dataEditions.entries,
      numFound: dataEditions.size,
    };
  } catch (err) {
    return { success: false, error: "Error fetching book editions data" };
  }
};

export const fetchSearch = async (query: string, offset: Number) => {
  if (query.trim()) {
    const endpoint = `${BASE_URL}/search.json?q=${query.replace(/\s+/g, "+")}&limit=10&offset=${offset}&fields=key,title,author_name,editions,isbn,publish_year`;

    //console.log(endpoint);

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        // @ts-ignore
        return { success: false, error: "Error with search" };
      }

      const data = await response.json();

      //if (offset === 0 && data.docs.length !== 0) {
      //  await updateTrendingCount(data.docs[0]);
      //}

      return { success: true, data: data.docs, numFound: data.numFound };
    } catch (err) {
      return { success: false, error: "Error with search" };
    }
  } else {
    return { success: true, data: [] };
  }
};

export const fetchAuthor = async (authorId: string) => {
  const endpoint = `${BASE_URL}/authors/${authorId}.json`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      // @ts-ignore
      return { success: false, error: "Error fetching author data" };
    }

    const data = await response.json();

    return { success: true, data: data };
  } catch (err) {
    return { success: false, error: "Error fetching author data" };
  }
};

export const fetchAuthorWorks = async (
  authorId: string,
  limit = 20,
  offset = 0,
) => {
  const endpoint = `${BASE_URL}/authors/${authorId}/works.json?limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      // @ts-ignore
      return { success: false, error: "Error fetching author works data" };
    }

    const data = await response.json();

    return { success: true, data: data.entries, numFound: data.size };
  } catch (err) {
    return { success: false, error: "Error fetching author works data" };
  }
};

export const fetchISBN = async (isbn) => {
  const endpoint = `${BASE_URL}/isbn/${isbn}.json`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      // @ts-ignore
      return { success: false, error: "Error fetching ISBN data" };
    }

    const data = await response.json();

    return { success: true, data: data };
  } catch (err) {
    return { success: false, error: "Error fetching ISBN data" };
  }
};
