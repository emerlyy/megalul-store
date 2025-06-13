import clsx from "clsx";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import "./Pagination.css";

interface Props {
  totalPages: number;
  currentPage: number;
  handleChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  totalPages,
  currentPage,
  handleChange,
  className,
}: Props) => {
  const pages = [];

  for (let i = currentPage - 2; i < currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPages) continue;
    pages.push(i);
  }

  const onChange = (nextPage: number) => {
    if (nextPage === currentPage) return;
    handleChange(nextPage);
  };

  return (
    <ul className={clsx("pagination", className)}>
      <li>
        <button onClick={() => onChange(1)} className="pagination__item">
          <BiFirstPage className="pagination__icon" />
        </button>
      </li>
      <li>
        <button
          onClick={() => onChange(Math.max(currentPage - 1, 1))}
          className="pagination__item"
        >
          <GrFormPrevious className="pagination__icon" />
        </button>
      </li>
      {pages.map((num) => {
        const isActive = num === currentPage;
        return (
          <li key={num}>
            <button
              className={clsx("pagination__item", {
                pagination__item_active: isActive,
              })}
              onClick={() => onChange(num)}
            >
              {num}
            </button>
          </li>
        );
      })}
      <li>
        <button
          onClick={() => onChange(Math.min(currentPage + 1, totalPages))}
          className="pagination__item"
        >
          <GrFormNext className="pagination__icon" />
        </button>
      </li>
      <li>
        <button
          onClick={() => onChange(totalPages)}
          className="pagination__item"
        >
          <BiLastPage className="pagination__icon" />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
