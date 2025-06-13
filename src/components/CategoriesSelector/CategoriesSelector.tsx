import { createPortal } from "react-dom";
// import { BiCategory, BiX } from "react-icons/bi";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useToggle } from "../../hooks/useToggle";
import { useCategories } from "../../store/categories/useCategories";
import Text from "../../ui/Text/Text";
import "./CategoriesSelector.css";

type Params = {
  category: string;
};

const CategoriesSelector = () => {
  const { status, items: categories } = useCategories();
  const [isCategoriesActive, toggleIsCategoryActive, , close] =
    useToggle(false);

  const { category: activeCategory } = useParams<Params>();
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, close, isCategoriesActive);

  useEffect(() => {
    if (isCategoriesActive) {
      document.body.classList.add("noscroll");
    } else {
      document.body.classList.remove("noscroll");
    }
  }, [isCategoriesActive]);

  return (
    <>
      <button
        className="categories-button"
        onClick={() => toggleIsCategoryActive()}
      >
        <Text tag="span" color="inherit" size="regular">
          Categories
        </Text>
      </button>
      {isCategoriesActive && (
        <>
          {createPortal(
            <div className="overlay">
              <div ref={ref} className="category-selector-body container">
                {status === "loading" ? (
                  <h2>Loading...</h2>
                ) : (
                  <ul className="category-selector-list">
                    {categories?.map((category) => {
                      const isActive = category.slug === activeCategory;
                      return (
                        <li
                          key={category.slug}
                          className={clsx("category-selector__item", {
                            "category-selector__item_active": isActive,
                          })}
                        >
                          <Link
                            className="category-selector__link"
                            to={`/${category.slug}`}
                            onClick={() => toggleIsCategoryActive(false)}
                          >
                            <Text color="inherit" weight="medium">
                              {category.name}
                            </Text>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>,
            document.body
          )}
        </>
      )}
    </>
  );
};

export default CategoriesSelector;
