export type MovieType = {
  title: string;
  original_language: string;
  id: string;
  movieId: string;
  overview: string;
  poster_path: string;
  release_date: string;
};

export type ReviewType = {
  comments: string;
  star: number;
  place: string;
  date: string;
};

export type MovieReviewType = {
  title: string;

  movieId: string;

  poster_path: string;
  release_date: string;
  comments: string;
  star: number;
  place: string;
  date: string;
};
