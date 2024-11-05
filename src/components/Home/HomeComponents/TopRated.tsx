import { useEffect, useState } from "react";
import { MovieType } from "../../../Types/Types";
import { Link } from "react-router-dom";

//stateの初期値（なくてもいい？）
const InitTopRated = {
  title: "",
  original_language: "",
  id: "0",
  movieId: "0",
  overview: "",
  poster_path: "",
  release_date: "",
};

const TopRated = () => {
  const [topRated, setTopRated] = useState<MovieType[]>([InitTopRated]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=c138ba4a545288f8b183db5cb6ca9a11&language=en-US&page=1"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log(jsonData.results);

        setTopRated(jsonData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="md:p-16">
      <h1 className="text-xl md:text-3xl text-center mb-6 font-merriweather font-bold">
        Top Rated
      </h1>
      <div className="md:flex flex-wrap grid grid-cols-2">
        {topRated.map((movie) => (
          <div key={movie.id} className="md:w-1/4 p-2.5 box-border mb-5">
            <Link to={`/Search/${movie.id}`}>
              <img
                className="w-max h-fit"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <p className="lg:text-2xl font-raleway">{movie.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
