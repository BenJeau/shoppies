import queryString from "query-string";
import { config } from "./config";

export const createUrl = (qs: Record<string, any>) =>
  `https://www.omdbapi.com/?${queryString.stringify({
    apiKey: config.OMDB_API_KEY,
    ...qs,
  })}`;
