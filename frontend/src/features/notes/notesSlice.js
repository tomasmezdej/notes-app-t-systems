import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNotes, createNote, updateNote, deleteNote } from './notesApi';

export const getNotes = createAsyncThunk('notes/getNotes', async () => {
  return await fetchNotes();
});

export const addNote = createAsyncThunk('notes/addNote', async (note) => {
  return await createNote(note);
});

export const editNote = createAsyncThunk('notes/editNote', async ({ id, note }) => {
  return await updateNote(id, note);
});

export const removeNote = createAsyncThunk('notes/removeNote', async (id) => {
  return await deleteNote(id);
});

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => { state.status = 'loading'; })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const index = state.items.findIndex(n => n.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(removeNote.fulfilled, (state, action) => {
        state.items = state.items.filter(n => n.id !== action.payload);
      });
  },
});

export const { setFilter } = notesSlice.actions;
export default notesSlice.reducer;