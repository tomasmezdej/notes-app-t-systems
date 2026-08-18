import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../features/notes/notesSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export default store;