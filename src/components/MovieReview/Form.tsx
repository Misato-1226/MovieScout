import { useState } from "react";
import { ReviewType } from "../../Types/Types";

interface PropsType {
  review: ReviewType;
  setReview: (value: ReviewType) => void;
}

export const Form = ({ review, setReview }: PropsType) => {
  const [hover, setHover] = useState(0); // ホバー状態の管理
  return (
    <form className="flex flex-col p-12">
      <div className="">
        <label>鑑賞した日: </label>
        <input
          className="ml-1 rounded-sm text-black"
          type="date"
          onChange={(e) => setReview({ ...review, date: e.target.value })}
        />
        <label className="ml-5 ">鑑賞した場所: </label>
        <input
          className="ml-1 rounded-sm text-black"
          type="text"
          onChange={(e) => setReview({ ...review, place: e.target.value })}
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
                  onClick={() => setReview({ ...review, star: ratingValue })} // クリックした星の評価値をセット
                  className="hidden"
                />
                <img
                  onMouseEnter={() => setHover(ratingValue)} // ホバー時の星の評価値をセット
                  onMouseLeave={() => setHover(0)} // ホバー解除時にリセット
                  className={`h-8 w-8 cursor-pointer inline-block ${
                    ratingValue <= (hover || review.star)
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
          className="p-10 text-black text-xl w-3/4 rounded-md"
          rows={15}
          onChange={(e) => setReview({ ...review, comments: e.target.value })}
        />
      </div>
    </form>
  );
};
