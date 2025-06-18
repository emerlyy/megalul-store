import { screen } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it } from "vitest";
import type { RootState } from "../../store";
import { renderRouter } from "../../tests/helpers/renderRouter";
import { renderWithRedux } from "../../tests/helpers/renderWithRedux";

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

describe("CheckoutPage", () => {
  it("Renders header", async () => {
    await act(() => {
      renderWithRedux(renderRouter(["/checkout"]), initialState);
    });

    const categoryButton = screen.getByText(/Categories/i);
    expect(categoryButton).toBeInTheDocument();
  });

  it("Renders checkout form", async () => {
    await act(() => {
      renderWithRedux(renderRouter(["/checkout"]), initialState);
    });
    const homePageTitle = screen.getByText(/CHECKOUT/i);
    expect(homePageTitle).toBeInTheDocument();
  });

  it("Renders summary", async () => {
    await act(() => {
      renderWithRedux(renderRouter(["/checkout"]), initialState);
    });
    const homePageTitle = screen.getByText(/SUMMARY/i);
    expect(homePageTitle).toBeInTheDocument();
    const checkoutButton = screen.getByText(/pay/i);
    expect(checkoutButton).toBeInTheDocument();
  });

  it("Renders footer", async () => {
    await act(() => {
      renderWithRedux(renderRouter(["/checkout"]), initialState);
    });
    const footerEmail = screen.getByText(/shopping@megalul.com/i);
    expect(footerEmail).toBeInTheDocument();
  });
});
