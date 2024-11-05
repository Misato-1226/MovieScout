import { useState } from "react";
import { MovieType } from "../../Types/Types";

interface PropsType {
  movie: MovieType | undefined;
  setMovie: (value: MovieType) => void;
}

export const Movie = ({ movie, setMovie }: PropsType) => {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<MovieType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  //const api_key = process.env.API_KEY;

  const fetchMovie = async (search: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=ja-JP&page=1&api_key=c138ba4a545288f8b183db5cb6ca9a11`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData.results);
      setShowSuggestions(true);
      setSuggestions(jsonData.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // inputの値が変更されたときに呼ばれる関数
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    // 入力がある程度進んだらAPIを呼び出してサジェストリストを表示
    if (newSearch.length >= 2) {
      fetchMovie(newSearch);
    } else {
      setSuggestions([]); // クエリが短い場合はサジェストをクリア
      setShowSuggestions(false); // サジェストリストを非表示
    }
  };

  const handleSuggestionClick = (suggestion: MovieType) => {
    setSearch(suggestion.title);
    setMovie(suggestion);
    setShowSuggestions(false);
  };
  return (
    <div className="flex justify-between p-10">
      <div className="relative">
        <label className="text-xl">映画を選ぶ</label>
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder="検索..."
          className="mt-10 text-black w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border border-gray-300 max-h-48 overflow-y-scroll z-10 mt-1 rounded-md shadow-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-black p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0"
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={movie ? "" : "mr-52"}>
        <h1 className="text-lg">
          映画タイトル: <span className="font-semibold">{movie?.title}</span>
        </h1>
        <h2 className="mt-3">
          リリース日:{" "}
          <span className="font-semibold">{movie?.release_date}</span>
        </h2>
        {movie?.poster_path ? (
          <img
            className="w-2/4 mt-8"
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          />
        ) : (
          <h1></h1>
        )}
      </div>
    </div>
  );
};
