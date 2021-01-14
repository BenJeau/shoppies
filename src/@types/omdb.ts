export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  type: "movie" | "series" | "episode";
  Poster: string;
}

export interface MovieSearchResponse {
  Search?: Movie[];
  totalResults?: number;
  Error?: string;
  Response: "True" | "False";
}
