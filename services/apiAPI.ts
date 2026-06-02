import { API_URL } from "../constants/urls";

export const fetchAPIShelves = async () => {
  // /trending/now.json?&sort=trending&limit=10
  const endpoint = `${API_URL}/shelf`;

  //console.log("aqui", endpoint);

  const response = await fetch(endpoint);

  if (!response.ok) {
    // @ts-ignore
    //throw new Error("Failed to fetch books", response.statusText);
    return { success: false, error: "Error fetching shelfs data" };
  }

  const data = await response.json();

  return { success: true, data: data };
};

export const fetchAPILists = async () => {
  // /trending/now.json?&sort=trending&limit=10
  const endpoint = `${API_URL}/lists_books`;

  //console.log("aqui", endpoint);

  const response = await fetch(endpoint);

  if (!response.ok) {
    // @ts-ignore
    //throw new Error("Failed to fetch books", response.statusText);
    return { success: false, error: "Error fetching lists data" };
  }

  const data = await response.json();

  return { success: true, data: data };
};

export const addShelf = async (
  id,
  selectedShelf,
  title,
  authors,
  method = "POST",
) => {
  const endpoint = `${API_URL}/shelf`;

  const dataBody = {
    id: id,
    selectedShelf: selectedShelf,
    title: title,
    authors: authors,
  };

  const response = await fetch(endpoint, {
    method: method, // Specify the method
    headers: {
      "Content-Type": "application/json", // Inform the server we're sending JSON
    },
    body: JSON.stringify(dataBody),
  });

  if (!response.ok) {
    // @ts-ignore
    //throw new Error("Failed to fetch books", response.statusText);
    return { success: false, error: response.error };
  }

  const result = await response.json();

  return { success: true, data: result.data };
};

export const addList = async (id, selectedLists, prevList, method) => {
  const endpoint = `${API_URL}/lists_books`;

  console.log(id, selectedLists, prevList, method);

  let response = null;

  if (method === "POST") {
    response = await fetch(endpoint, {
      method: method, // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
      },
      body: JSON.stringify({ selectedLists: selectedLists, id: id }),
    });
  } else {
    response = await fetch(endpoint, {
      method: method, // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
      },
      body: JSON.stringify({
        selectedLists: selectedLists,
        id: id,
        prevList: prevList,
      }),
    });
  }

  if (!response.ok) {
    // @ts-ignore
    //throw new Error("Failed to fetch books", response.statusText);
    return { success: false, error: response.error };
  }

  const result = await response.json();

  return { success: true };
};

export const createList = async (name, method, id) => {
  let response = null;
  if (method === "POST") {
    const endpoint = `${API_URL}/createList`;

    response = await fetch(endpoint, {
      method: method, // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
      },
      body: JSON.stringify({ name: name }),
    });
  } else {
    const endpoint = `${API_URL}/createList/${id}`;

    response = await fetch(endpoint, {
      method: method, // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
      },
      body: JSON.stringify({ name: name }),
    });
  }

  if (!response.ok) {
    // @ts-ignore
    //throw new Error("Failed to fetch books", response.statusText);
    return { success: false, error: response.error };
  }

  const result = await response.json();

  return { success: true, data: result.data };
};

export const updateTrendingCount = async (book) => {
  //console.log(book);

  const endpoint = `${API_URL}/trending`;

  const data = {
    author: book?.author_name.join(", ") ?? [""],
    title: book.title,
    bookid: book.editions.docs[0].key.split("/")[2],
  };

  const response = await fetch(endpoint, {
    method: "POST", // Specify the method
    headers: {
      "Content-Type": "application/json", // Inform the server we're sending JSON
    },
    body: JSON.stringify(data),
  });

  return;
};

export const fetchTrending = async () => {
  const endpoint = `${API_URL}/trending`;

  const response = await fetch(endpoint, {
    method: "GET", // Specify the method
    headers: {
      "Content-Type": "application/json", // Inform the server we're sending JSON
    },
  });

  if (!response.ok) {
    // @ts-ignore
    //throw new Error("Failed to fetch books", response.statusText);
    return { success: false, error: response.error };
  }

  const result = await response.json();

  return { success: true, data: result.data };
};
