import { createSlice } from "@reduxjs/toolkit";
import { fetchNotes } from "./actions";
import { TYPE_MAP } from "./types";

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
    addNote: (state, action) => {
      const type =
        TYPE_MAP[action.payload.type] ?? parseInt(action.payload.type);
      const newNote = {
        id: Date.now(),
        ...action.payload,
        type,
        image: type === 1 ? action.payload.image : null,
        checkboxes: type === 2 ? action.payload.checkboxes || [] : []
      };
      state.items.unshift(newNote);
    },
    deleteNote: (state, action) => {
      state.items = state.items.filter((note) => note.id !== action.payload);
    },
    updateNote: (state, action) => {
      const index = state.items.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        const type =
          TYPE_MAP[action.payload.type] ?? parseInt(action.payload.type);
        state.items[index] = {
          ...action.payload,
          type,
          image: type === 1 ? action.payload.image : null,
          checkboxes: type === 2 ? action.payload.checkboxes || [] : []
        };
      }
    },
    toggleCheckbox: (state, action) => {
      const { noteId, checkboxIndex } = action.payload;
      const note = state.items.find((note) => note.id === noteId);
      if (note && note.type === 2 && note.checkboxes[checkboxIndex]) {
        note.checkboxes[checkboxIndex].checked =
          !note.checkboxes[checkboxIndex].checked;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const {
  addNote,
  deleteNote,
  updateNote,
  toggleCheckbox,
  setFilter,
  setCurrentPage,
  setItemsPerPage
} = notesSlice.actions;

export default notesSlice.reducer;
