import clsx from "clsx";
import { useState, type FormEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router";
import "./Search.css";

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
      <label className={clsx("input search", className)}>
        <div className="input__icon">{<BiSearch width={20} height={20}/>}</div>
        <input
          type="text"
          className="input__field"
          placeholder="Search by name..."
          name="search"
          autoComplete="off"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </label>
    </form>
  );
};

export default Search;
