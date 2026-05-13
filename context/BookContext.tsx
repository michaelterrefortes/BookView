import { createContext, useState } from "react";

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [reading, setReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);
  const [notFinished, setNotFinished] = useState([]);
  const [read, setRead] = useState([]);

  return (
    <BookContext.Provider
      value={{
        reading,
        setReading,
        wantToRead,
        setWantToRead,
        notFinished,
        setNotFinished,
        read,
        setRead,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
