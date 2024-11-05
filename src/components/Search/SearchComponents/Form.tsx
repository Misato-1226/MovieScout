import { useContext, useState } from "react";
import { ResultsContext } from "../../../contexts/ResultsContext";

const Form = () => {
  const [search, setSearch] = useState("");
  const result = useContext(ResultsContext);

  const getMovie = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!search) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=ja-JP&page=3&api_key=c138ba4a545288f8b183db5cb6ca9a11`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log(jsonData.results);

      result?.setResults(jsonData.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="">
      <div className="text-center">
        <form className="form">
          <input
            type="text"
            className="mt-52 border text-xl py-2 text-black rounded-md"
            placeholder="映画のタイトル"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-700 hover:bg-purple-800 text-white text-xl rounded-md py-2 px-5 ml-2"
            onClick={getMovie}
          >
            検索
          </button>
        </form>
      </div>
      {result?.results && result.results.length <= 0 && (
        <div className="flex flex-cols justify-center items-center mt-52">
          <img
            width="100"
            height="100"
            src="https://img.icons8.com/ios-filled/50/FFFFFF/search--v1.png"
            alt="search--v1"
            className="opacity-40"
          />
          <h1>検索結果なし</h1>
        </div>
      )}
    </div>
  );
};

export default Form;
