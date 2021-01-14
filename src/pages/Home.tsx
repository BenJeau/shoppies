import { useMemo, useState } from "react";
import { Page, Layout, TextContainer, Link, Frame } from "@shopify/polaris";
import { LinkMinor } from "@shopify/polaris-icons";

import { ResultsCard, SearchCard } from "../components";
import { Movie, Nomination } from "../@types";
import { useMovieSearch } from "../hooks";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [nominations, setNominations] = useState<Nomination[]>([]);

  const { moviesSearch, loading, size, setSize } = useMovieSearch(
    searchValue
  );

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
  
  const addNomination = (nomination: Nomination) =>
    setNominations((prev) => [...prev, nomination]);

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
