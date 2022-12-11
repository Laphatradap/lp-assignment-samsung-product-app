import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "./Products";

import productService from "./productsAPI";

interface ProductState {
  products: ProductProps[];
}

const initialState: ProductState = {
  products: [],
};

export const getProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    return await productService.getProducts();
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action: PayloadAction<any>) => {
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.products = [];
      });
  },
});

export default productSlice.reducer;
