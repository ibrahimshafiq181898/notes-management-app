import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  currentPage: 1,
  itemsPerPage: 10,
  filter: "all"
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { setCurrentPage, setFilter } = notesSlice.actions;
export default notesSlice.reducer;
