export { useMovieSearch } from "./useMovieSearch";

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error();
  }

  return res.json();
};