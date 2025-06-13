import type { Category, Product } from "../types";

const BASE_URL = "https://dummyjson.com";

const PAGE_AMOUNT = 12;

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ApiResponse =
  | {
      products: Product[];
      page: number;
      totalPages: number;
    }
  | undefined;


export type Api = {
  getAllProducts: (page?: number) => Promise<ApiResponse>;
  getProductDetails: (id: Product["id"]) => Promise<Product>;
  searchProducts: (query: string, page?: number) => Promise<ApiResponse>;
  getCategoriesList: () => Promise<Category[]>;
  getProductsByCategory: (
    category: string,
    page?: number
  ) => Promise<ApiResponse>;
};

export const client: Api = {
  getAllProducts: async (page = 1) => {
    try {
      const skip = (page - 1) * PAGE_AMOUNT;
      const res = await fetch(
        `${BASE_URL}/products?limit=${PAGE_AMOUNT}&skip=${skip}`
      );

      const data = (await res.json()) as ProductsResponse;
      const curPage = (data.skip + PAGE_AMOUNT) / PAGE_AMOUNT;
      const totalPages = Math.ceil(data.total / PAGE_AMOUNT);

      return { products: data.products, page: curPage, totalPages };
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Failed to fetch");
      }
    }
  },
  getProductDetails: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`);
      const data = await res.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Failed to fetch");
      }
    }
  },
  searchProducts: async (query, page = 1) => {
    try {
      const skip = (page - 1) * PAGE_AMOUNT;
      const res = await fetch(
        `${BASE_URL}/products/search?limit=${PAGE_AMOUNT}&skip=${skip}&q=${query}`
      );

      const data = (await res.json()) as ProductsResponse;
      const curPage = (data.skip + PAGE_AMOUNT) / PAGE_AMOUNT;
      const totalPages = Math.ceil(data.total / PAGE_AMOUNT);

      return { products: data.products, page: curPage, totalPages };
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Failed to search");
      }
    }
  },
  getCategoriesList: async () => {
    try {
      const res = await fetch(`${BASE_URL}/products/categories`);
      const data = await res.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Failed to search");
      }
    }
  },
  getProductsByCategory: async (category, page = 1) => {
    try {
      const skip = (page - 1) * PAGE_AMOUNT;
      const res = await fetch(
        `${BASE_URL}/products/category/${category}?limit=${PAGE_AMOUNT}&skip=${skip}`
      );

      const data = (await res.json()) as ProductsResponse;
      const curPage = (data.skip + PAGE_AMOUNT) / PAGE_AMOUNT;
      const totalPages = Math.ceil(data.total / PAGE_AMOUNT);

      return { products: data.products, page: curPage, totalPages };
    } catch (err) {
      if (err instanceof Error) {
        throw new Error("Failed to fetch");
      }
    }
  },
};
