import { useEffect, useMemo, useState } from "react";
import {
  Page,
  Layout,
  TextContainer,
  Link,
  Frame,
  Banner,
} from "@shopify/polaris";
import { LinkMinor } from "@shopify/polaris-icons";
import queryString from "query-string";

import { NominationsCard, ResultsCard, SearchCard } from "../components";
import { Movie, Nomination } from "../@types";
import { useMovies, useMovieSearch, useNominations } from "../hooks";

const Home = () => {
  const [nominations, setNominations] = useNominations<Nomination[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [movieIds, setMovieIds] = useState<string[]>([]);

  const { moviesSearch, loading, size, setSize, error } = useMovieSearch(
    searchValue
  );

  const {
    movies,
    loading: loadingNominations,
    error: errorNominations,
  } = useMovies(movieIds);

  const loadMore = () => {
    setSize(size + 1);
  };

  const flatenedMoviesSearch = useMemo(
    () =>
      moviesSearch
        ? moviesSearch.reduce<Movie[]>((acc, { Search }) => {
            if (Search) {
              acc.push(...Search);
            }
            return acc;
          }, [])
        : [],
    [moviesSearch]
  );

  const clearNominations = () => setNominations([]);

  const addNomination = (nomination: Nomination) =>
    setNominations((prev) => [...prev, nomination]);

  const removeNomination = (id: string) =>
    setNominations((prev) => prev.filter((nomination) => id !== nomination.id));

  useEffect(() => {
    if (window.location.search) {
      const query = queryString.parse(window.location.search);
      window.history.replaceState(null, "", window.location.pathname);

      if (
        query.nominations &&
        typeof query.nominations === "object" &&
        query.nominations.length > 0
      ) {
        setMovieIds(query.nominations);
      }
    }
  }, []);

  useEffect(() => {
    if (movies) {
      setNominations(
        movies.map((i) => ({
          id: i.imdbID,
          name: i.Title,
          year: i.Year,
        }))
      );

      setMovieIds([]);
    }
  }, [movies, setNominations]);

  const bannerMarkup = nominations.length > 4 && (
    <Layout.Section>
      <Banner status="warning">
        You have reached the maximum number of nominations
      </Banner>
    </Layout.Section>
  );

  const apiErrorMarkup = (error || errorNominations) && (
    <Layout.Section>
      <Banner status="critical">Error communicating with the OMDB API</Banner>
    </Layout.Section>
  );

  return (
    <Frame>
      <div style={{ paddingTop: 30 }}>
        <Page
          title="The Shoppies"
          subtitle="Shopify 2021 Summer Internship Challenge"
          secondaryActions={[
            {
              content: "Github Repository",
              external: true,
              url: "https://github.com/BenJeau/shoppies",
              icon: LinkMinor,
            },
          ]}
        >
          <Layout>
            {apiErrorMarkup}
            {bannerMarkup}
            <Layout.Section>
              <SearchCard
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </Layout.Section>
            <Layout.Section>
              <ResultsCard
                searchValue={searchValue}
                addNomination={addNomination}
                loadMore={loadMore}
                loading={loading}
                nominations={nominations}
                movies={flatenedMoviesSearch}
              />
            </Layout.Section>
            <Layout.Section>
              <NominationsCard
                nominations={nominations}
                clearNominations={clearNominations}
                removeNomination={removeNomination}
                loading={movieIds.length > 0 && loadingNominations}
              />
            </Layout.Section>
            <Layout.Section>
              <TextContainer>
                2021 - Made by{" "}
                <Link url="https://jeaurond.dev" external>
                  Benoît Jeaurond
                </Link>
              </TextContainer>
            </Layout.Section>
          </Layout>
        </Page>
      </div>
    </Frame>
  );
};

export default Home;
