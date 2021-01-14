import { useCallback, useState } from "react";
import {
  Card,
  EmptyState,
  List,
  Spinner,
  Stack,
  Toast,
} from "@shopify/polaris";
import {
  MinusMinor,
  DeleteMinor,
  ClipboardMinor,
} from "@shopify/polaris-icons";
import queryString from "query-string";

import { Nomination } from "../@types";
import EmptyNominations from "../assets/EmptyNominations.svg";
import MovieEntry from "./MovieEntry";

interface NominationsCardProps {
  nominations: Nomination[];
  clearNominations: () => void;
  removeNomination: (id: string) => void;
  loading: boolean;
}

const NominationsCard: React.FC<NominationsCardProps> = ({
  nominations,
  clearNominations,
  removeNomination,
  loading,
}) => {
  const [active, setActive] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const loadingMarkup = (
    <Stack distribution="center" vertical alignment="center">
      <Spinner />
      <p>Loading nominations ...</p>
    </Stack>
  );
  const emptyMarkup = (
    <EmptyState
      heading="Nominate your top five movies"
      image={EmptyNominations}
    >
      <p>Your movie nominations will appear here</p>
    </EmptyState>
  );

  const getNominationsURL = () => {
    return `${window.location.origin}?${queryString.stringify({
      nominations: nominations.map(({ id }) => id),
    })}`;
  };
  const toastMarkup = (
    <Toast
      content={copyError ? "Error copying nomination URL" : "Successfully copied nomination URL"}
      onDismiss={toggleActive}
      error={copyError}
    />
  );

  const copyNominationURL = () => {
    const text = getNominationsURL();
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyError(false);
        toggleActive();
      },
      () => {
        setCopyError(true);
        toggleActive();
      }
    );
  };

  return (
    <>
      <Card
        title="Nominations"
        secondaryFooterActions={[
          {
            content: "Clear nominations",
            disabled: nominations.length === 0,
            onAction: clearNominations,
            icon: DeleteMinor,
          },
        ]}
        primaryFooterAction={{
          content: "Copy nomination URL",
          disabled: nominations.length === 0,
          onAction: copyNominationURL,
          icon: ClipboardMinor,
        }}
      >
        <Card.Section subdued>
          {loading ? (
            loadingMarkup
          ) : nominations.length === 0 ? (
            emptyMarkup
          ) : (
            <List>
              {nominations.map(({ name, year, id }) => (
                <MovieEntry
                  key={id}
                  icon={MinusMinor}
                  label="Remove nomination"
                  movieTitle={`${name} (${year})`}
                  onClick={() => removeNomination(id)}
                />
              ))}
            </List>
          )}
        </Card.Section>
      </Card>
      {active && toastMarkup}
    </>
  );
};

export default NominationsCard;
