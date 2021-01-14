import useSWR from "swr";

import { fetcher } from ".";
import { Movie } from "../@types";
import { createUrl } from "../utils";

const multipleFetcher = (...urls: string[]) => Promise.all(urls.map(fetcher));

export const useMovies = (movieIds: string[]) => {
  const { data, error } = useSWR<Movie[]>(
    movieIds.map((id) => createUrl({ i: id })),
    multipleFetcher
  );

  return {
    movies: data,
    loading: !error && !data,
    error,
  };
};
