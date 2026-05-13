import { createContext, useState } from "react";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [reading, setReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [notFinished, setNotFinished] = useState([]);
  const [finished, setFinished] = useState([]);

  const [listsBooks, setListsBooks] = useState([]);

  return (
    <BookContext.Provider
      value={{
        reading,
        setReading,
        wantToRead,
        setWantToRead,
        notFinished,
        setNotFinished,
        finished,
        setFinished,
        listsBooks,
        setListsBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
