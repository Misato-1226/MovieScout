import { useState } from "react";
import { Form } from "../components/MovieReview/Form";
import { Movie } from "../components/MovieReview/Movie";
import { MovieReviewType, MovieType, ReviewType } from "../Types/Types";
import { addMovieReview } from "../firebase";
import { useNavigate } from "react-router-dom";

export const MovieReviewForm = () => {
  const [movie, setMovie] = useState<MovieType>();
  const [review, setReview] = useState<ReviewType>({
    date: "",
    comments: "",
    star: 0,
    place: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const reviewDetail: MovieReviewType = {
      movieId: movie?.id.toString() || "",
      title: movie?.title || "",
      poster_path: movie?.poster_path || "",
      release_date: movie?.release_date || "",
      comments: review.comments,
      place: review.place,
      date: review.date,
      star: review.star,
    };
    try {
      await addMovieReview(reviewDetail);
      navigate("/my_page");
      console.log("success to fetch API", reviewDetail);
    } catch (error) {
      console.error("Error adding movie review:", error);
    }
  };
  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-center text-3xl font-semibold mb-28 font-klee">
        映画日記
      </h1>
      <div className=" border-8 border-gray-400 rounded-lg w-3/4 bg-slate-400 bg-opacity-30">
        <Movie movie={movie} setMovie={setMovie} />
        <Form review={review} setReview={setReview} />
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-purple-700 py-3 px-5 rounded-lg hover:bg-purple-800"
            onClick={handleSubmit}
          >
            保存する
          </button>
        </div>
      </div>
    </div>
  );
};
