import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { RootState } from "../../store";
import { renderWithRedux } from "../../tests/helpers/renderWithRedux";
import { renderRouter } from "../../tests/helpers/renderRouter";

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

describe("HomePage", () => {
  it("Renders header", () => {
    renderWithRedux(renderRouter(["/"]), initialState);
    const categoryButton = screen.getByText(/Categories/i);
    expect(categoryButton).toBeInTheDocument();
  });

  it("Renders title", () => {
    renderWithRedux(renderRouter(["/"]), initialState);
    const homePageTitle = screen.getByText(/All Products/i);
    expect(homePageTitle).toBeInTheDocument();
  });

  it("Renders footer", () => {
    renderWithRedux(renderRouter(["/"]), initialState);
    const footerEmail = screen.getByText(/shopping@megalul.com/i);
    expect(footerEmail).toBeInTheDocument();
  });
});
