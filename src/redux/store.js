import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./notes";

export const store = configureStore({
  reducer: {
    notes: notesReducer
  }
});
