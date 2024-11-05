import {
  collection,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { MovieReviewType, MovieType } from "./Types/Types";
import { User } from "firebase/auth";

export const addUser = async (user: User) => {
  // ログインしているユーザーのユーザー ID を取得

  try {
    // ユーザーがログインしている場合
    if (user) {
      // ユーザーのドキュメントを作成します。
      const userRef = doc(db, "users", user.uid);
      // ユーザーのドキュメントにデータを設定します。
      await setDoc(userRef, {
        email: user.email,
      });
    } else {
      // ユーザーはログインしていません
      console.log("ユーザーはログインしていません");
    }
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export const getLikedMovie = async () => {
  const userId = auth.currentUser?.uid;
  try {
    if (userId) {
      const likedMoviesRef = collection(db, "users", userId, "liked_movie");
      const querySnapshot = await getDocs(likedMoviesRef);

      if (!querySnapshot.empty) {
        const movieData = querySnapshot.docs.map(
          (doc) => doc.data() as MovieType
        );
        return movieData;
      } else {
        console.log("No liked movies found!");
      }
    } else {
      console.log("ユーザーはログインしていません");
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
};

export const getWatchMovie = async () => {
  const userId = auth.currentUser?.uid;
  try {
    if (userId) {
      const watchMoviesRef = collection(db, "users", userId, "watch_movie");
      const querySnapshot = await getDocs(watchMoviesRef);

      if (!querySnapshot.empty) {
        const movieData = querySnapshot.docs.map(
          (doc) => doc.data() as MovieType
        );
        return movieData;
      } else {
        console.log("No watch later movies found!");
      }
    } else {
      console.log("ユーザーはログインしていません");
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
};

export const addLikedMovie = async (movie: MovieType) => {
  //const movieId = movie.id.toString();
  const userId = auth.currentUser?.uid;
  try {
    //もしユーザーがログインしていたら...
    if (userId) {
      const likedMoviesRef = collection(db, "users", userId, "liked_movie");

      // 映画のデータを `liked_movie` コレクションに追加
      await setDoc(doc(likedMoviesRef, movie.id), {
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        original_language: movie.original_language,
        movieId: movie.id,
      });

      console.log("Document written with ID: ", movie.id);
    } else {
      // ユーザーがログインしていなかったら
      console.log("ユーザーはログインしていません");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteLikedMovie = async (id: string) => {
  const userId = auth.currentUser?.uid;
  try {
    if (userId) {
      const likedMoviesRef = collection(db, "users", userId, "liked_movie");

      await deleteDoc(doc(likedMoviesRef, id));
      console.log("Document deleting with ID: ", id);
    } else {
      // ユーザーがログインしていなかったら
      console.log("ユーザーはログインしていません");
    }
  } catch (error) {
    console.error(`Error deleting movie with ID ${id}:`, error);
  }
};

export const addWatchMovie = async (movie: MovieType) => {
  const userId = auth.currentUser?.uid;
  try {
    if (userId) {
      const watchMoviesRef = collection(db, "users", userId, "watch_movie");

      // 映画のデータを `watch_movie` コレクションに追加
      await setDoc(doc(watchMoviesRef, movie.id), {
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        original_language: movie.original_language,
        movieId: movie.id,
      });

      console.log("Document written with ID: ", movie.id);
    } else {
      // ユーザーがログインしていなかったら
      console.log("ユーザーはログインしていません");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteWatchMovie = async (id: string) => {
  const userId = auth.currentUser?.uid;
  try {
    if (userId) {
      const watchMoviesRef = collection(db, "users", userId, "watch_movie");

      await deleteDoc(doc(watchMoviesRef, id));
      console.log("Document deleting with ID: ", id);
    } else {
      // ユーザーがログインしていなかったら
      console.log("ユーザーはログインしていません");
    }
  } catch (error) {
    console.error(`Error deleting movie with ID ${id}:`, error);
  }
};

export const getAllMovieReview = async () => {
  const userId = auth.currentUser?.uid;
  try {
    if (userId) {
      const movieReviewRef = collection(db, "users", userId, "movie_review");
      const querySnapshot = await getDocs(movieReviewRef);

      if (!querySnapshot.empty) {
        const ReviewData = querySnapshot.docs.map(
          (doc) => doc.data() as MovieReviewType
        );
        return ReviewData;
      } else {
        console.log("No movie review found!");
      }
    } else {
      console.log("ユーザーはログインしていません");
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
};

export const addMovieReview = async (review: MovieReviewType) => {
  const userId = auth.currentUser?.uid;
  try {
    if (userId) {
      // ドキュメントIDとして review.movieId を指定
      const movieReviewRef = collection(db, "users", userId, "movie_review");

      await setDoc(doc(movieReviewRef, review.movieId), {
        title: review.title,
        release_date: review.release_date,
        poster_path: review.poster_path,
        movieId: review.movieId, // ドキュメントIDと同じ
        star: review.star,
        comments: review.comments,
        place: review.place,
        date: review.date,
      });
      console.log("Success to adding movie review");
    } else {
      // ユーザーがログインしていなかったら
      console.log("ユーザーはログインしていません");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getMovieReview = async (id: string) => {
  const userId = auth.currentUser?.uid;
  try {
    if (userId) {
      const movieReviewRef = doc(db, "users", userId, "movie_review", id);
      const review = await getDoc(movieReviewRef);
      if (review.exists()) {
        console.log("Found review: ", review.data());
      } else {
        console.log("No such review!");
      }
      return review.data();
    } else {
      console.log("ユーザーはログインしていません");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const deleteMovieReview = async (id: string) => {
  const userId = auth.currentUser?.uid;
  try {
    if (userId) {
      const movieReviewRef = collection(db, "users", userId, "movie_review");
      await deleteDoc(doc(movieReviewRef, id));
      console.log("Document deleting with ID: ", id);
    } else {
      console.log("ユーザーはログインしていません");
    }
  } catch (error) {
    console.error(`Error deleting movie with ID ${id}:`, error);
  }
};

export const updateMovieReview = async (review: MovieReviewType) => {
  const userId = auth.currentUser?.uid;
  try {
    if (userId) {
      const movieReviewRef = collection(db, "users", userId, "movie_review");
      await updateDoc(doc(movieReviewRef, review.movieId), review);
      console.log("Document updating with ID: ", review.movieId);
    } else {
      console.log("ユーザーはログインしていません");
    }
  } catch (error) {
    console.error(`Error updating movie with ID ${review.movieId}:`, error);
  }
};
