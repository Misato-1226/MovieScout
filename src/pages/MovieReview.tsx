import { useEffect, useState } from "react";
import { MovieReviewType } from "../Types/Types";
import { Link, useParams } from "react-router-dom";
import { getMovieReview } from "../firebase";

export const MovieReview = () => {
  const { movieId } = useParams();
  const [review, setReview] = useState<MovieReviewType>();
  useEffect(() => {
    const fetchReview = async () => {
      try {
        if (movieId) {
          const reviewData = await getMovieReview(movieId);
          if (reviewData) {
            console.log("結果だよ", reviewData.title);
            setReview(reviewData as MovieReviewType);
          }
        }
      } catch (error) {
        console.log("Failed to fetch review", error);
      }
    };
    fetchReview();
  }, [movieId]);
  return (
    <div>
      <h1 className="text-center text-3xl text-white mt-20 font-bold font-klee">
        映画日記
      </h1>
      <div className="flex items-center justify-center p-32">
        <div className="note ">
          <div className="line flex justify-center">
            <div>
              <h1 className="text-2xl font-semibold">{review?.title}</h1>
              <h2 className="font-semibold">
                リリース日: {review?.release_date}
              </h2>
              <img
                className="w-2/4 p-3"
                src={`https://image.tmdb.org/t/p/w500/${review?.poster_path}`}
              />
              <Link
                to={`/Search/${review?.movieId}`}
                className="underline mt-2"
              >
                More detail
              </Link>
            </div>
            <div className="w-1/2">
              <h2 className="font-semibold">
                鑑賞した日: <span>{review?.date}</span>
              </h2>
              <h2 className="font-semibold">
                鑑賞した場所: <span>{review?.place}</span>
              </h2>
              {/**評価の数に応じて星の数を変える!!! */}
              <h2 className="font-semibold">評価:</h2>
              <div className="flex">
                {Array(review?.star)
                  .fill(null)
                  .map((_, index) => (
                    <img
                      key={index}
                      className="w-6"
                      src="https://img.icons8.com/?size=100&id=7856&format=png&color=FAB005"
                    />
                  ))}
              </div>
              <h2 className="font-semibold mt-3">感想: </h2>

              <p className="text-xl leading-8 font-zen">{review?.comments}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
