import { createContext, useEffect, useState } from "react";
import { MovieType } from "../Types/Types";
import { getWatchMovie } from "../firebase";

type Props = {
  children: React.ReactNode;
};

type ContextState = {
  WatchList: MovieType[];
  setWatchList: React.Dispatch<React.SetStateAction<MovieType[]>>;
};

export const WatchListContext = createContext<ContextState | undefined>(
  undefined
);

export const WatchListProvider = ({ children }: Props) => {
  const [WatchList, setWatchList] = useState<MovieType[]>([]);

  useEffect(() => {
    const fetchWatchMovie = async () => {
      try {
        const movies = await getWatchMovie();

        console.log("Watch Later Movies: ", movies);
        if (movies) {
          setWatchList(movies);
        }
      } catch (error) {
        console.error("Error with getting likedList: ", error);
      }
    };

    fetchWatchMovie();
  }, []);
  return (
    <WatchListContext.Provider value={{ WatchList, setWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
};
