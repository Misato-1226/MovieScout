import { useContext, useEffect, useState } from "react";
import { LikedListContext } from "../contexts/LikedListContext";
import { WatchListContext } from "../contexts/WatchListContext";
import { Link } from "react-router-dom";
import { Review } from "../components/Review";
import { deleteMovieReview, getAllMovieReview } from "../firebase";
import { MovieReviewType } from "../Types/Types";

const MyPage = () => {
  const likedList = useContext(LikedListContext);
  const watchList = useContext(WatchListContext);
  const [reviews, setReviews] = useState<MovieReviewType[]>([]);
  const [loadIndex, setLoadIndex] = useState(3);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleDeleteReview = async (movie: MovieReviewType) => {
    //レビューを削除する処理
    try {
      await deleteMovieReview(movie.movieId);
      setReviews((prev) => prev.filter((review) => review !== movie));
      console.log("レビューを削除しました。");
    } catch (error) {
      console.error("Error removing movie review:", error);
    }
  };

  const handleDisplay = () => {
    if (loadIndex > reviews.length) {
      setIsEmpty(true);
    } else {
      setLoadIndex(loadIndex + 3);
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const reviewData = await getAllMovieReview();
        if (reviewData) {
          setReviews(reviewData);
          if (loadIndex >= reviewData.length) {
            setIsEmpty(true);
          }
        } else {
          console.log("Not found movie review!");
        }
      } catch (error) {
        console.error("Fail to get movie review", error);
      }
    };
    fetchReview();
  }, [loadIndex]);

  return (
    <>
      <div className="md:p-20">
        <h1 className="pt-36 text-center text-2xl lg:text-3xl lg:mt-0 font-semibold font-noto mb-16">
          マイページ
        </h1>

        <h2 className="text-xl lg:text-3xl font-kosugi lg:p-0 p-3">
          いいねした映画
        </h2>
        <div className="lg:flex flex-wrap grid grid-cols-3 md:grid-cols-4">
          {likedList?.LikedList.map((movie) => (
            <div
              key={movie.movieId}
              className="list-none lg:w-2/12 p-2.5 box-border mb-8"
            >
              <Link to={`/Search/${movie.movieId}`}>
                <img
                  className="w-max h-fit"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
              </Link>
            </div>
          ))}
        </div>
        <h2 className="text-xl lg:text-3xl font-kosugi lg:p-0 p-3">
          あとで見る映画
        </h2>
        <div className="lg:flex flex-wrap grid grid-cols-3 md:grid-cols-4">
          {watchList?.WatchList.map((movie) => (
            <div className="list-none lg:w-2/12 p-2.5 box-border mb-5">
              <Link to={`/Search/${movie.movieId}`}>
                <img
                  className="w-max h-fit"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-48">
          <div className="lg:flex justify-between">
            <h2 className="font-semibold text-2xl p-3 lg:text-3xl lg:p-0 font-klee">
              映画日記
              <span className="font-normal ml-5 lg:text-lg text-sm">
                ✴︎鑑賞した映画の感想を記録しよう！✴︎
              </span>
            </h2>
            <div className="flex justify-start p-3 lg:p-0">
              <Link
                to="/my_page/movie_review/new"
                className="border border-yellow-300 text-black bg-white rounded-xl p-3"
              >
                日記を追加する
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center mt-5">
            {reviews.slice(0, loadIndex).map((review) => {
              return (
                <Link
                  key={review.movieId}
                  to={`/my_page/movie_review/${review.movieId}`}
                  className="border-4 border-zinc-100 w-3/4 p-5 mt-10 rounded-lg bg-blue-800 bg-opacity-50"
                >
                  <Review review={review} onDelete={handleDeleteReview} />
                </Link>
              );
            })}
          </div>

          {!isEmpty && (
            <div className="flex justify-center">
              <button onClick={handleDisplay} className="mt-10 underline">
                もっと見る
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPage;
