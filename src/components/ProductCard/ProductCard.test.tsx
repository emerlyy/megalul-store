import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../../tests/helpers/renderWithRouter";
import type { ProductCardProps } from "./ProductCard";
import ProductCard from "./ProductCard";

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
    render(renderWithRouter(<ProductCard {...testProduct} />));

    const title = screen.getByText(/Kiwi/i);
    expect(title).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", testProduct.thumbnail);
  });

  it("Formatting rating", () => {
    render(renderWithRouter(<ProductCard {...testProduct} />));
    const rating = screen.getByText("4");
    expect(rating).toBeInTheDocument();
  });

  it("Formatting price", () => {
    render(renderWithRouter(<ProductCard {...testProduct} />));
    const price = screen.getByText("$2.49");
    expect(price).toBeInTheDocument();
  });
});
