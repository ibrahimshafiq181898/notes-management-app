import { createSelector } from "@reduxjs/toolkit";
import { TYPE_MAP } from "./types";

const selectNotesState = (state) => state.notes;

export const selectAllNotes = createSelector(
  [selectNotesState],
  (notes) => notes.items
);

export const selectFilteredNotes = createSelector(
  [selectAllNotes, (state) => state.notes.filter],
  (notes, filter) => {
    if (filter === "all") return notes;
    const typeValue = TYPE_MAP[filter];
    return notes.filter((note) => note.type === typeValue);
  }
);

export const selectPaginatedNotes = createSelector(
  [
    selectFilteredNotes,
    (state) => state.notes.currentPage,
    (state) => state.notes.itemsPerPage
  ],
  (filteredNotes, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNotes.slice(startIndex, startIndex + itemsPerPage);
  }
);
