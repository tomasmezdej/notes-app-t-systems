import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Button, Typography } from '@mui/material';
import { getNotes } from './features/notes/notesSlice';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import FilterBar from './components/FilterBar';

function App() {
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleEdit = (note) => {
    setEditingNote(note);
    setFormOpen(true);
  };

  const handleClose = () => {
    setEditingNote(null);
    setFormOpen(false);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Notes</Typography>
      <Button variant="contained" onClick={() => setFormOpen(true)} sx={{ marginBottom: 2 }}>
        Add Note
      </Button>
      <FilterBar
        sortOrder={sortOrder}
        onToggleSort={toggleSortOrder}
      />
      <NoteForm
        open={formOpen}
        onClose={handleClose}
        editingNote={editingNote}
      />

      <NoteList
        onEdit={handleEdit}
        sortOrder={sortOrder}
      />
    </Container>
  );
}

export default App;