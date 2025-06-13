import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Api } from "../../api/client";
import type { RootState } from "../../store";
import type { Category, FetchStatus } from "../../types";

interface CategoriesState {
  items: Category[];
  status: FetchStatus;
  error: string | null;
}

// Define the initial state using that type
const initialState: CategoriesState = {
  items: [],
  status: "idle",
  error: null,
};

export const loadCategories = createAsyncThunk<
  Category[],
  undefined,
  {
    state: RootState;
    rejectValue: string;
    extra: { api: Api };
  }
>(
  "categories/loadCategories",
  async (_, { rejectWithValue, extra: { api } }) => {
    try {
      const categories = await api.getCategoriesList();
      return categories;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Cannot fetch categories");
    }
  },
  {
    condition: (_, { getState }) => {
      const status = getState().categories.status;
      if (status === "loading") return false;
    },
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.items = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || "Cannot load data";
      });
  },
});

export const selectCategories = (state: RootState) => state.categories;

const categoriesReducer = categoriesSlice.reducer;

export default categoriesReducer;
