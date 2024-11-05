// src/routes/AppRoute.jsx
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "../pages/Home";
import { ResultsProvider } from "../contexts/ResultsContext";
import { LikedListProvider } from "../contexts/LikedListContext";
import { Suspense, lazy, useEffect, useState } from "react";
import Movie_detail from "../pages/Movie_detail";
import { WatchListProvider } from "../contexts/WatchListContext";
import { Authenticate } from "../pages/Authenticate";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "../firebaseConfig";
import Header from "../components/Header"; // ヘッダーをインポート
import Layout from "../layout";
import { ProtectedRoute } from "../protectedRoute";
import MyPage from "../pages/MyPage";
import { MovieReviewForm } from "../pages/MovieReviewForm";
import { MovieReview } from "../pages/MovieReview";
import { MovieReviewEdit } from "../pages/MovieReviewEdit";

const Search = lazy(() => import("../pages/Search"));

export default function AppRoute() {
  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const location = useLocation(); // 現在のURLパスを取得

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });

    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  // ヘッダーを非表示にしたいパスのリスト
  const noHeaderPaths = ["/authenticate"];

  return (
    <Layout>
      <ResultsProvider>
        <LikedListProvider>
          <WatchListProvider>
            {/* 現在のパスがヘッダーを非表示にするリストに含まれていない場合にのみ表示 */}
            {!noHeaderPaths.includes(location.pathname) && (
              <Header user={user} />
            )}
            <Suspense fallback={<h1>Loading...</h1>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/authenticate" element={<Authenticate />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search/:movieId" element={<Movie_detail />} />
                <Route
                  path="/my_page"
                  element={
                    <ProtectedRoute user={user}>
                      <MyPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my_page/movie_review/new"
                  element={
                    <ProtectedRoute user={user}>
                      <MovieReviewForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my_page/movie_review/:movieId"
                  element={
                    <ProtectedRoute user={user}>
                      <MovieReview />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my_page/movie_review/:movieId/edit"
                  element={
                    <ProtectedRoute user={user}>
                      <MovieReviewEdit />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </WatchListProvider>
        </LikedListProvider>
      </ResultsProvider>
    </Layout>
  );
}
