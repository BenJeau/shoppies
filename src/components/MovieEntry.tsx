import { Button, List, Stack } from "@shopify/polaris";

interface MovieEntryProps {
  movieTitle: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  disabled?: boolean;
}

const MovieEntry: React.FC<MovieEntryProps> = ({
  movieTitle,
  label,
  icon,
  onClick,
  disabled,
}) => (
  <List.Item>
    <Stack distribution="equalSpacing" alignment="center">
      <p>{movieTitle}</p>
      <Button icon={icon} onClick={onClick} disabled={disabled}>
        {label}
      </Button>
    </Stack>
  </List.Item>
);

export default MovieEntry;
