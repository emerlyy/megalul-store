import { useState, type FormEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router";
import Input from "../../ui/Input/Input";

type Props = {
  className?: string;
};

const Search = ({ className }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ query: searchQuery });
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="search"
        type="text"
        className="input__field"
        placeholder="Search by name..."
        name="search"
        autoComplete="off"
        textColor="text-secondary"
        fieldSize="small"
        icon={<BiSearch />}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
};

export default Search;
