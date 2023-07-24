import { createSlice } from "@reduxjs/toolkit";

interface FilterValue {
  searchTerm: string;
  genre: string;
  year: number;
}

const initialState: FilterValue = {
  searchTerm: "",
  genre: "",
  year: 0,
};

const BookSlice = createSlice({
  name: "bookSearch",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchTerm = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
  },
});
export const { setSearch, setGenre, setYear } = BookSlice.actions;
export default BookSlice.reducer;
