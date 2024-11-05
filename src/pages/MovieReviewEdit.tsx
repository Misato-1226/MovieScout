import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieReview, updateMovieReview } from "../firebase";
import { MovieReviewType } from "../Types/Types";
import { useNavigate } from "react-router-dom";

export const MovieReviewEdit = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState<MovieReviewType>();
  const [hover, setHover] = useState(0); // ホバー状態の管理

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const fetchReview = async () => {
      try {
        const review = await getMovieReview(movieId);
        if (review) {
          console.log(review);
          setReview(review as MovieReviewType);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReview();
  }, [movieId]);

  const handleSubmit = async () => {
    try {
      if (review) {
        await updateMovieReview(review);
        navigate("/my_page");
      } else {
        console.log("something went wrong, try again!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-center text-3xl font-semibold mb-28 font-klee">
        映画日記
      </h1>
      <div className=" border-8 border-gray-400 rounded-lg w-3/4 bg-slate-400 bg-opacity-30">
        <div className="flex justify-between">
          <div className="p-10">
            <h1 className="text-2xl font-semibold">{review?.title}</h1>
            <h2 className="font-semibold">
              リリース日: {review?.release_date}
            </h2>
            <img
              className="w-3/4 mt-8"
              src={`https://image.tmdb.org/t/p/w500/${review?.poster_path}`}
            />
            <Link to={`/Search/${review?.movieId}`} className="underline mt-2">
              More detail
            </Link>
          </div>
          <form className="flex flex-col p-12">
            <div className="">
              <label>鑑賞した日: </label>
              <input
                className="ml-1 rounded-sm text-black"
                type="date"
                value={review?.date}
                onChange={(e) =>
                  setReview((prev) => ({ ...prev!, date: e.target.value }))
                }
              />
              <label className="ml-5 ">鑑賞した場所: </label>
              <input
                className="ml-1 rounded-sm text-black"
                type="text"
                value={review?.place}
                onChange={(e) =>
                  setReview((prev) => ({ ...prev!, place: e.target.value }))
                }
              />
            </div>
            <div>
              <div className="mt-10">
                <label>評価: </label>
                {[...Array(5)].map((_star, index) => {
                  const ratingValue = index + 1;

                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() =>
                          setReview((prev) => ({ ...prev!, star: ratingValue }))
                        }
                        className="hidden"
                      />

                      <img
                        onMouseEnter={() => setHover(ratingValue)} // ホバー時の星の評価値をセット
                        onMouseLeave={() => setHover(0)} // ホバー解除時にリセット
                        className={`h-8 w-8 cursor-pointer inline-block ${
                          //この星の部分を修正する。
                          ratingValue <= (hover || (review?.star ?? 0))
                            ? "bg-yellow-400"
                            : "text-gray-300"
                        }`}
                        src="https://img.icons8.com/?size=100&id=7856&format=png&color=FFFFFF"
                        alt="star"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col mt-10">
              <label>コメント: </label>
              <textarea
                className="p-10 text-black text-xl rounded-md"
                value={review?.comments}
                rows={20}
                onChange={(e) =>
                  setReview((prev) => ({ ...prev!, place: e.target.value }))
                }
              />
            </div>
          </form>
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-purple-700 py-3 px-5 rounded-lg hover:bg-purple-800"
            onClick={handleSubmit}
          >
            変更を保存する
          </button>
        </div>
      </div>
    </div>
  );
};
