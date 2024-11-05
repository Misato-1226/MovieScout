import { createContext, useEffect, useState } from "react";
import { MovieType } from "../Types/Types";
import { getLikedMovie } from "../firebase";

type Props = {
  children: React.ReactNode;
};

type ContextState = {
  LikedList: MovieType[];
  setLikedList: React.Dispatch<React.SetStateAction<MovieType[]>>;
};

export const LikedListContext = createContext<ContextState | undefined>(
  undefined
);

export const LikedListProvider = ({ children }: Props) => {
  const [LikedList, setLikedList] = useState<MovieType[]>([]);

  useEffect(() => {
    const fetchLikedMovie = async () => {
      try {
        const movies = await getLikedMovie();
        console.log("Liked Movies: ", movies);

        if (movies) {
          setLikedList(movies);
        }
      } catch (error) {
        console.error("Error with getting likedList: ", error);
      }
    };

    fetchLikedMovie();
  }, []);
  return (
    <LikedListContext.Provider value={{ LikedList, setLikedList }}>
      {children}
    </LikedListContext.Provider>
  );
};
