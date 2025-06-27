import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data.map((note) => {
    const type = Math.floor(Math.random() * 3);
    return {
      ...note,
      type,
      image:
        type === 1 ? `https://picsum.photos/seed/${note.id}/800/400` : null,
      checkboxes: type === 2 ? [] : []
    };
  });
});
