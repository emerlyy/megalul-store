import { createAsyncThunk, createSlice, type Draft } from "@reduxjs/toolkit";
import type { Api } from "../../api/client";
import type { RootState } from "../../store";
import type { FetchStatus, Product } from "../../types";

interface ProductsState {
  items: Product[];
  status: FetchStatus;
  error: string | null;
  page: number;
  totalPages: number;
}

const initialState: ProductsState = {
  status: "idle",
  error: null,
  items: [],
  page: 1,
  totalPages: 1,
};

// export const loadProducts = createAsyncThunk<
//   { products: Product[]; page: number; totalPages: number },
//   LoadProductsArgs,
//   {
//     state: RootState;
//     rejectValue: string;
//     extra: { api: Api };
//   }
// >(
//   "products/loadProducts",
//   async ({ category, page, query }, { rejectWithValue, extra: { api } }) => {
//     try {
//       let response;
//       if (query) {
//         response = await api.searchProducts(query, page);
//       } else if (category && category !== "all") {
//         response = await api.getProductsByCategory(category, page);
//       } else {
//         response = await api.getAllProducts(page);
//       }

//       if (!response) {
//         throw new Error("Failed to fetch");
//       }
//       return response;
//     } catch (err) {
//       if (err instanceof Error) return rejectWithValue(err.message);
//       return rejectWithValue("Cannot fetch products");
//     }
//   },
//   {
//     condition: (_, { getState }) => {
//       const status = getState().products.status;
//       if (status === "loading") return false;
//     },
//   }
// );

export const loadProducts = createAsyncThunk<
  { products: Product[]; page: number; totalPages: number },
  { page: number },
  {
    state: RootState;
    rejectValue: string;
    extra: { api: Api };
  }
>(
  "products/loadProducts",
  async ({ page }, { rejectWithValue, extra: { api } }) => {
    try {
      const response = await api.getAllProducts(page);
      if (!response) throw new Error("Failed to fetch");
      return response;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Cannot fetch products");
    }
  },
  {
    condition: (_, { getState }) => {
      const status = getState().products.status;
      if (status === "loading") return false;
    },
  }
);

export const loadProductsByCategory = createAsyncThunk<
  { products: Product[]; page: number; totalPages: number },
  { page?: number; category: string },
  {
    state: RootState;
    rejectValue: string;
    extra: { api: Api };
  }
>(
  "products/loadProducts/byCategory",
  async ({ category, page }, { rejectWithValue, extra: { api } }) => {
    try {
      const response = await api.getProductsByCategory(category, page);
      if (!response) {
        throw new Error("Failed to fetch");
      }
      return response;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Cannot fetch products");
    }
  },
  {
    condition: (_, { getState }) => {
      const status = getState().products.status;
      if (status === "loading") return false;
    },
  }
);

export const loadProductsBySearch = createAsyncThunk<
  { products: Product[]; page: number; totalPages: number },
  { page?: number; query: string },
  {
    state: RootState;
    rejectValue: string;
    extra: { api: Api };
  }
>(
  "products/loadProducts/bySearch",
  async ({ query, page }, { rejectWithValue, extra: { api } }) => {
    try {
      const response = await api.searchProducts(query, page);
      if (!response) {
        throw new Error("Failed to fetch");
      }
      return response;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Cannot fetch products");
    }
  },
  {
    condition: (_, { getState }) => {
      const status = getState().products.status;
      if (status === "loading") return false;
    },
  }
);

// export const loadProductDetails = createAsyncThunk<
//   Product,
//   string,
//   {
//     state: RootState;
//     rejectValue: string;
//     extra: { api: Api };
//   }
// >(
//   "products/loadProductsDetails",
//   async (productId, { rejectWithValue, extra: { api } }) => {
//     try {
//       const productDetails = await api.getProductDetails(productId);
//       return productDetails;
//     } catch (err) {
//       if (err instanceof Error) return rejectWithValue(err.message);
//       return rejectWithValue("Cannot fetch product details");
//     }
//   },
//   {
//     condition: (_, { getState }) => {
//       const status = getState().products.status;
//       if (status === "loading") return false;
//     },
//   }
// );

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, loadingReducer)
      .addCase(loadProducts.fulfilled, successReducer)
      .addCase(loadProducts.rejected, errorReducer)

      .addCase(loadProductsByCategory.pending, loadingReducer)
      .addCase(loadProductsByCategory.fulfilled, successReducer)
      .addCase(loadProductsByCategory.rejected, errorReducer)

      .addCase(loadProductsBySearch.pending, loadingReducer)
      .addCase(loadProductsBySearch.fulfilled, successReducer)
      .addCase(loadProductsBySearch.rejected, errorReducer);
  },
});

const loadingReducer = (state: Draft<ProductsState>) => {
  state.status = "loading";
  state.error = null;
};

const errorReducer = (state: Draft<ProductsState>, action: any) => {
  state.status = "rejected";
  state.error = action.payload || "Cannot load data";
};

const successReducer = (state: Draft<ProductsState>, action: any) => {
  state.status = "fulfilled";
  state.items = action.payload.products;
  state.page = action.payload.page;
  state.totalPages = action.payload.totalPages;
};

export const selectProducts = (state: RootState) => state.products;
export const selectProductDetails = (state: RootState, productId: string) =>
  state.products.items.find((product) => product.id == productId);

const productsReducer = productsSlice.reducer;

export default productsReducer;
