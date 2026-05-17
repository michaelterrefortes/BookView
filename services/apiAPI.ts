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
