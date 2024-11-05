import { Link } from "react-router-dom";
import { MovieReviewType } from "../Types/Types";

interface PropsType {
  review: MovieReviewType;
  onDelete: (movie: MovieReviewType) => Promise<void>;
}

export const Review = ({ review, onDelete }: PropsType) => {
  //オンクリックが反応ない！！きっと、Linkタグの中にあるから？？
  const handleClick = (movie: MovieReviewType) => {
    if (confirm("この映画日記を削除しますか。")) {
      onDelete(movie);
    } else {
      return;
    }
  };
  return (
    <div>
      <div className="lg:flex justify-between">
        <h1 className="lg:text-2xl font-semibold">{review.title}</h1>
        <h2 className="lg:text-2xl font-semibold">評価★ {review.star}</h2>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="lg:text-base text-sm mt-3">鑑賞した日: {review.date}</p>
          <p className="lg:text-base text-sm">鑑賞した場所: {review.place}</p>
        </div>
        <div className="flex gap-3">
          <Link to={`/my_page/movie_review/${review.movieId}/edit`}>
            <img
              className="w-8 h-8"
              src="https://img.icons8.com/?size=100&id=59770&format=png&color=FFFFFF"
            />
          </Link>
          <img
            className="w-8 h-8"
            onClick={(e) => {
              e.preventDefault();
              handleClick(review);
            }}
            src="https://img.icons8.com/?size=100&id=11767&format=png&color=FFFFFF"
          />
        </div>
      </div>
    </div>
  );
};
