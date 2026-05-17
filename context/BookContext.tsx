import { createContext, useState } from "react";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [shelfBooks, setShelfBooks] = useState([]);
  const [listsBooks, setListsBooks] = useState([]);

  return (
    <BookContext.Provider
      value={{
        shelfBooks,
        setShelfBooks,
        listsBooks,
        setListsBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
