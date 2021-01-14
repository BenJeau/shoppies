import { Card, Icon, TextContainer, TextField } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

interface SearchCardProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchCard: React.FC<SearchCardProps> = ({
  searchValue,
  setSearchValue,
}) => {
  const clear = () => setSearchValue("");

  return (
    <Card>
      <Card.Section subdued>
        <TextContainer>
          Search for movies in which you want to nominate for{" "}
          <b>The Shoppies</b> and have an impact on the selection of
          nominations!
        </TextContainer>
      </Card.Section>
      <Card.Section>
        <TextField
          label="Movie Title"
          value={searchValue}
          onChange={setSearchValue}
          clearButton
          onClearButtonClick={clear}
          placeholder="Search for movies"
          prefix={<Icon source={SearchMinor} color="inkLighter" />}
        />
      </Card.Section>
    </Card>
  );
};

export default SearchCard;
