import { createSlice } from "@reduxjs/toolkit";

interface bookInitalSchema {
  wishListedBooks: { bookName: string; readed: boolean; userEmail: string }[];
}

const initialState: bookInitalSchema = {
  wishListedBooks: [],
};

const wishListSLice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
});

export default wishListSLice.reducer;
