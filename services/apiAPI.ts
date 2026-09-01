import { API_URL } from "../constants/urls";
import { getAccessToken } from "./auth";

export const fetchAPIShelves = async () => {
  // /trending/now.json?&sort=trending&limit=10

  const token = await getAccessToken();
  const endpoint = `${API_URL}/shelf`;

  //console.log("aqui", endpoint);

  try {
    const response = await fetch(endpoint, {
      method: "GET", // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // @ts-ignore
      //throw new Error("Failed to fetch books", response.statusText);
      return { success: false, error: "Error fetching shelfs data" };
    }

    const data = await response.json();

    return { success: true, data: data };
  } catch (err) {
    return { success: false, error: "Error fetching shelfs data" };
  }
};

export const fetchAPILists = async () => {
  // /trending/now.json?&sort=trending&limit=10
  const token = await getAccessToken();
  const endpoint = `${API_URL}/lists_books`;

  //console.log("aqui", endpoint);

  try {
    const response = await fetch(endpoint, {
      method: "GET", // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // @ts-ignore
      //throw new Error("Failed to fetch books", response.statusText);
      return { success: false, error: "Error fetching lists data" };
    }

    const data = await response.json();

    return { success: true, data: data };
  } catch (err) {
    return { success: false, error: "Error fetching lists data" };
  }
};

export const addShelf = async (
  id,
  selectedShelf,
  title,
  authors,
  method = "POST",
) => {
  const token = await getAccessToken();
  const endpoint = `${API_URL}/shelf`;

  const dataBody = {
    id: id,
    selectedShelf: selectedShelf,
    title: title,
    authors: authors,
  };

  try {
    const response = await fetch(endpoint, {
      method: method, // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
        Authorization: `Bearer ${token}`,
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
  } catch (err) {
    return { success: false, error: "Error adding book" };
  }
};

export const addList = async (id, selectedLists, prevList, method) => {
  const endpoint = `${API_URL}/lists_books`;

  const token = await getAccessToken();

  //console.log(id, selectedLists, prevList, method);

  let response = null;

  try {
    if (method === "POST") {
      response = await fetch(endpoint, {
        method: method, // Specify the method
        headers: {
          "Content-Type": "application/json", // Inform the server we're sending JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ selectedLists: selectedLists, id: id }),
      });
    } else {
      response = await fetch(endpoint, {
        method: method, // Specify the method
        headers: {
          "Content-Type": "application/json", // Inform the server we're sending JSON
          Authorization: `Bearer ${token}`,
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
  } catch (err) {
    return { success: false, error: "Error adding list." };
  }
};

export const createList = async (name, method, id) => {
  const token = await getAccessToken();

  try {
    let response = null;
    if (method === "POST") {
      const endpoint = `${API_URL}/createList`;

      response = await fetch(endpoint, {
        method: method, // Specify the method
        headers: {
          "Content-Type": "application/json", // Inform the server we're sending JSON
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
      });
    } else {
      const endpoint = `${API_URL}/createList/${id}`;

      response = await fetch(endpoint, {
        method: method, // Specify the method
        headers: {
          "Content-Type": "application/json", // Inform the server we're sending JSON
          Authorization: `Bearer ${token}`,
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
  } catch (err) {
    return { success: false, error: "Error creating list." };
  }
};

export const updateTrendingCount = async (book) => {
  //console.log(book);

  const token = await getAccessToken();

  const endpoint = `${API_URL}/trending`;

  const data = {
    author: book?.author_name ?? "",
    title: book.title,
    bookid: book.bookid.split("/")[2],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return;
  } catch (err) {
    return { success: false, error: "Error updating trending." };
  }
};

export const fetchTrending = async () => {
  const endpoint = `${API_URL}/trending`;

  const token = await getAccessToken();

  try {
    const response = await fetch(endpoint, {
      method: "GET", // Specify the method
      headers: {
        "Content-Type": "application/json", // Inform the server we're sending JSON
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // @ts-ignore
      //throw new Error("Failed to fetch books", response.statusText);
      return { success: false, error: response.error };
    }

    const result = await response.json();

    return { success: true, data: result.data };
  } catch (err) {
    return { success: false, error: "Error fetching trending." };
  }
};
