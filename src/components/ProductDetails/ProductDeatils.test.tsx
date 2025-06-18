import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { useCounter } from "../../hooks/useCounter";
import { addItemToCart } from "../../store/cart/cartSlice";
import type { Product } from "../../types";
import ProductDetails from "./ProductDetails";

vi.mock("../../hooks/reduxHooks", () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock("../../hooks/useCounter", () => ({
  useCounter: vi.fn(),
}));

vi.mock("../ImageViewer/ImageViewer", () => ({
  default: () => <div>ImageViewer</div>,
}));

vi.mock("../GoBackButton/GoBackButton", () => ({
  default: () => <button>Back</button>,
}));

const mockDispatch = vi.fn();

const mockProduct: Pick<
  Product,
  "id" | "thumbnail" | "price" | "title" | "images" | "description" | "category"
> = {
  id: "1",
  title: "Test Product",
  price: 120,
  category: "test-category",
  description: "Product description",
  thumbnail: "image.jpg",
  images: ["img1.jpg", "img2.jpg"],
};

describe("ProductDetails", () => {
  beforeEach(() => {
    (useAppDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockDispatch
    );
    (useCounter as ReturnType<typeof vi.fn>).mockReturnValue([
      2,
      vi.fn(),
      vi.fn(),
    ]);
    vi.clearAllMocks();
  });

  it("Renders product details correctly", () => {
    render(<ProductDetails {...mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Product description")).toBeInTheDocument();
    expect(screen.getByText("$120")).toBeInTheDocument();
    expect(screen.getByText("ADD TO CART")).toBeInTheDocument();
  });

  it("dispatches addItemToCart action on button click", () => {
    render(<ProductDetails {...mockProduct} />);

    const button = screen.getByText("ADD TO CART");
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(
      addItemToCart({
        id: "1",
        image: "image.jpg",
        price: 120,
        quantity: 2,
        name: "Test Product",
      })
    );
  });
});
