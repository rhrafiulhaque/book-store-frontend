import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/Book/BookSlice";
import { apiSlice } from "./features/api/apiSlice";
import wishListReducer from "./features/wishlist/wishListSlice";

export const store = configureStore({
  reducer: {
    wishList: wishListReducer,
    SearchList: searchReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
