import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { RootState } from "../../store";
import { renderWithRedux } from "../../tests/helpers/renderWithRedux";
import { renderWithRouter } from "../../tests/helpers/renderWithRouter";
import type { ProductCardProps } from "./ProductCard";
import ProductCard from "./ProductCard";

const initialState: RootState = {
  cart: {
    items: [],
    totalQuantity: 0,
  },
  categories: {
    status: "idle",
    items: [],
    error: null,
  },
  products: {
    error: null,
    items: [],
    page: 1,
    status: "idle",
    totalPages: 1,
  },
};

const testProduct: ProductCardProps = {
  id: "1",
  category: "Groceries",
  price: 2.49,
  rating: 4.2,
  thumbnail: "https://example.com/image.jpg",
  title: "Kiwi",
};

describe("ProductCard", () => {
  it("Renders", () => {
    renderWithRedux(
      renderWithRouter(<ProductCard {...testProduct} />),
      initialState
    );
    const title = screen.getByText(/Kiwi/i);
    expect(title).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", testProduct.thumbnail);
  });

  it("Formatting rating", () => {
    renderWithRedux(
      renderWithRouter(<ProductCard {...testProduct} />),
      initialState
    );
    const rating = screen.getByText("4");
    expect(rating).toBeInTheDocument();
  });

  it("Formatting price", () => {
    renderWithRedux(
      renderWithRouter(<ProductCard {...testProduct} />),
      initialState
    );
    const price = screen.getByText("$2.49");
    expect(price).toBeInTheDocument();
  });
});
