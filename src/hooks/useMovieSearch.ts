import { useSWRInfinite } from "swr";

import { fetcher } from ".";
import { MovieSearchResponse } from "../@types";
import { createUrl } from "../utils";

const getKey = (
  pageIndex: number,
  previousPageData: MovieSearchResponse | null,
  searchValue: string
) => {
  if (previousPageData && previousPageData.Search?.length !== 10) return null;
  return createUrl({ s: searchValue, page: (pageIndex + 1).toString() });
};

export const useMovieSearch = (searchValue: string) => {
  const { data, error, size, setSize } = useSWRInfinite<MovieSearchResponse>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, searchValue),
    fetcher
  );

  return {
    moviesSearch: data,
    loading: !error && !data,
    error,
    size,
    setSize,
  };
};
