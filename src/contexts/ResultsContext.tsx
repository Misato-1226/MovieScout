import { createContext, useState } from "react";
import { MovieType } from "../Types/Types";

type Props = {
  children: React.ReactNode;
};

type ContextState = {
  results: MovieType[];
  setResults: React.Dispatch<React.SetStateAction<MovieType[]>>;
};

//SearchコンポーネントのFormとList間で検索した映画の結果を共有させる
export const ResultsContext = createContext<ContextState | undefined>(
  undefined
);

export const ResultsProvider = ({ children }: Props) => {
  const [results, setResults] = useState<MovieType[]>([]);
  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  );
};
