import {
  Button,
  Card,
  List,
  Scrollable,
  Spinner,
  Stack,
} from "@shopify/polaris";
import { PlusMinor, RefreshMinor } from "@shopify/polaris-icons";

import { Movie, Nomination } from "../@types";
import MovieEntry from "./MovieEntry";

interface ResultsCardProps {
  loading: boolean;
  searchValue: string;
  nominations: Nomination[];
  movies: Movie[];
  loadMore: () => void;
  addNomination: (nomination: Nomination) => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  loading,
  searchValue,
  nominations,
  movies,
  loadMore,
  addNomination,
}) => {
  const emptySearchMarkup = <p>Start searching and see related movies here</p>;
  const emptyResultsMarkup = <p>No results</p>;
  const loadingMarkup = (
    <Stack distribution="center" vertical alignment="center">
      <Spinner />
      <p>Loading results ...</p>
    </Stack>
  );

  const loadMoreMarkup = movies.length !== 0 && movies.length % 10 === 0 && (
    <Card.Section>
      <Button fullWidth onClick={loadMore} icon={RefreshMinor}>
        Load more
      </Button>
    </Card.Section>
  );

  return (
    <Card title={`Results for "${searchValue}"`}>
      <Card.Section subdued>
        {loading ? (
          loadingMarkup
        ) : !searchValue ? (
          emptySearchMarkup
        ) : movies.length === 0 ? (
          emptyResultsMarkup
        ) : (
          <Scrollable style={{ maxHeight: 400, overflowX: "hidden" }} shadow>
            <List>
              {movies.map(({ imdbID, Year, Title }) => (
                <MovieEntry
                  key={imdbID}
                  icon={PlusMinor}
                  label="Add nomination"
                  movieTitle={`${Title} (${Year})`}
                  onClick={() =>
                    addNomination({
                      id: imdbID,
                      name: Title,
                      year: Year,
                    })
                  }
                  disabled={
                    nominations.length > 4 ||
                    nominations.some(({ id }) => id === imdbID)
                  }
                />
              ))}
            </List>
          </Scrollable>
        )}
      </Card.Section>
      {loadMoreMarkup}
    </Card>
  );
};

export default ResultsCard;
