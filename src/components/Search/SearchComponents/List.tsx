import { useContext } from "react";
import { ResultsContext } from "../../../contexts/ResultsContext";
import { Link } from "react-router-dom";

const List = () => {
  const result = useContext(ResultsContext);

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="lg:flex flex-wrap md:p-16 grid grid-cols-2 md:grid-cols-3">
        {result?.results.map((movie) => (
          <div key={movie.id} className="lg:w-1/4 p-2.5 box-border mb-5">
            <Link to={`/Search/${movie.id}`}>
              <img
                className="w-max h-fit"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <p className="lg:text-2xl">{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
      {result?.results && result.results.length > 0 && (
        <div className="text-center">
          <button className="underline text-xl p-5" onClick={returnTop}>
            上に戻る
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
