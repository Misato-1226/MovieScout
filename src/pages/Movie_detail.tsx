import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieType } from "../Types/Types";
import { FaRegHeart } from "react-icons/fa";
import { BsEmojiSunglasses } from "react-icons/bs";
import { LikedListContext } from "../contexts/LikedListContext";
import { WatchListContext } from "../contexts/WatchListContext";
import {
  addLikedMovie,
  addWatchMovie,
  deleteLikedMovie,
  deleteWatchMovie,
} from "../firebase";

const Movie_detail = () => {
  const [movie, setMovie] = useState<MovieType | undefined>(undefined);
  const { movieId } = useParams();
  //いいねとあとで見るのアイコン切り替えステイト
  const [icon, setIcon] = useState({
    liked: false,
    watch: false,
  });
  //context
  const likedList = useContext(LikedListContext);
  const watchList = useContext(WatchListContext);

  useEffect(() => {
    //この条件文がないと、movieIdが使えない！
    if (!movieId) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=c138ba4a545288f8b183db5cb6ca9a11&?language=en-US`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log("映画詳細:", jsonData);
        setMovie(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [movieId]);

  // アイコンの状態をチェックするuseEffect
  useEffect(() => {
    if (!movieId) return; // movieIdがない場合は終了

    const checkIcon = () => {
      const movieIdToString = movieId.toString();

      if (likedList) {
        const movieIndex = likedList.LikedList.findIndex(
          (movie) => movie.movieId === movieIdToString
        );
        //likedList.LikedList.map((movie) => console.log("each movie:", movie));
        if (movieIndex !== -1) {
          setIcon((prevIcon) => ({ ...prevIcon, liked: true }));
        }
      }

      if (watchList) {
        const movieIndex = watchList.WatchList.findIndex(
          (movie) => movie.movieId === movieIdToString
        );
        if (movieIndex !== -1) {
          setIcon((prevIcon) => ({ ...prevIcon, watch: true }));
        }
      }
    };

    checkIcon();
  }, [likedList, movieId, watchList]); // iconは依存に含めない

  // useEffect(() => {
  //   // likedListが更新された後の処理を行う
  //   console.log("Liked list updated:", likedList.LikedList);
  // }, [likedList.LikedList]); // likedListの更新を監視

  const handleLikedList = async (likedMovie: MovieType) => {
    //likedListに該当の映画のidが含まれているか確認
    if (likedList) {
      const movieId = likedMovie.id.toString();
      const movieIndex = likedList.LikedList.findIndex(
        (movie) => movie.movieId === movieId
      );
      // console.log(movieId);
      console.log(likedMovie);

      // 映画がリストに存在しない場合、データベースに追加する
      if (movieIndex === -1) {
        setIcon({ ...icon, liked: true });

        const movieData = {
          id: movieId,
          movieId: movieId,
          title: likedMovie.title,
          poster_path: likedMovie.poster_path,
          overview: likedMovie.overview,
          release_date: likedMovie.release_date,
          original_language: likedMovie.original_language,
        };

        // データベースに追加
        try {
          await addLikedMovie(movieData);
          console.log("New movie added with ID:", movieId);

          // ローカルの状態を更新
          likedList.setLikedList((prevLikedList) => {
            const updatedList = [...prevLikedList, movieData];
            // ローカルの状態を更新した後に`console.log`を出力
            console.log("Updated likedList after addition:", updatedList);
            return updatedList;
          });
        } catch (error) {
          console.error("Error adding movie:", error);
        }
      } else {
        // 映画がリストに存在する場合、データベースから削除する
        setIcon({ ...icon, liked: false });
        try {
          if (likedMovie.id) {
            // idがundefinedでないことを確認
            await deleteLikedMovie(movieId); // データベースから削除する関数
            console.log("Movie removed with ID:", movieId);

            likedList.LikedList.map((movie) => {
              console.log(movie.id);
            });
            // ローカルの状態を更新
            likedList.setLikedList((prevLikedList) => {
              const updatedList = prevLikedList.filter(
                (movie) => movie.movieId !== movieId
              );

              console.log("Updated likedList after removal:", updatedList);
              return updatedList;
            });
          } else {
            console.error("Error: Movie ID is undefined.");
          }
        } catch (error) {
          console.error("Error removing movie:", error);
        }
      }
    }
  };

  const handleWatchList = async (watchMovie: MovieType) => {
    //likedListに該当の映画のidが含まれているか確認
    if (watchList) {
      const movieId = watchMovie.id.toString();
      const movieIndex = watchList?.WatchList.findIndex(
        (movie) => movie.movieId === movieId
      );

      // console.log(movieId);
      // console.log(likedList.LikedList);

      // 映画がリストに存在しない場合、データベースに追加する
      if (movieIndex === -1) {
        setIcon({ ...icon, watch: true });

        const movieData = {
          id: movieId,
          movieId: movieId,
          title: watchMovie.title,
          poster_path: watchMovie.poster_path,
          overview: watchMovie.overview,
          release_date: watchMovie.release_date,
          original_language: watchMovie.original_language,
        };

        // データベースに追加
        try {
          await addWatchMovie(movieData);
          console.log("New movie added with ID:", movieId);

          // ローカルの状態を更新
          watchList?.setWatchList((prevLikedList) => {
            const updatedList = [...prevLikedList, movieData];
            // ローカルの状態を更新した後に`console.log`を出力
            console.log("Updated watchList after addition:", updatedList);
            return updatedList;
          });
        } catch (error) {
          console.error("Error adding movie:", error);
        }
      } else {
        // 映画がリストに存在する場合、データベースから削除する
        setIcon({ ...icon, watch: false });
        try {
          if (watchMovie.id) {
            // idがundefinedでないことを確認
            await deleteWatchMovie(movieId); // データベースから削除する関数
            console.log("Movie removed with ID:", movieId);

            // ローカルの状態を更新
            watchList?.setWatchList((prevLikedList) => {
              const updatedList = prevLikedList.filter(
                (movie) => movie.id !== movieId
              );

              console.log("Updated watchList after removal:", updatedList);
              return updatedList;
            });
          } else {
            console.error("Error: Movie ID is undefined.");
          }
        } catch (error) {
          console.error("Error removing movie:", error);
        }
      }
    }
  };

  return (
    <>
      {movie ? (
        <div className="flex flex-col items-center justify-center md:flex-row  gap-x-5 md:py-56 box-border">
          <img
            className="sm:w-1/4 w-2/4 h-fit lg:py-0 py-16"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          />
          <div className="lg:p-5 w-2/4">
            <p className="sm:text-3xl text-2xl mb-5 font-playfair">
              {movie.title}
            </p>
            <p className="mb-5 md:text-xl font-lora">{movie.overview}</p>
            <p>Language: {movie.original_language}</p>
            <p>Release: {movie.release_date}</p>
            <div className="flex justify-end gap-x-3">
              <div
                onClick={() => handleLikedList(movie)}
                className="cursor-pointer"
              >
                <FaRegHeart
                  className={`size-6 m-2 cursor-pointer ${
                    icon.liked ? "liked" : ""
                  }`}
                />
                <p>いいね</p>
              </div>
              <div
                onClick={() => handleWatchList(movie)}
                className="cursor-pointer"
              >
                <BsEmojiSunglasses
                  className={`size-6 m-2  ${icon.watch ? "watched" : ""}`}
                />
                <p>あとで見る</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Movie_detail;
