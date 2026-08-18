import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Typography } from '@mui/material';
import { getNotes } from './features/notes/notesSlice';
import NoteForm from './components/NoteForm';

function App() {
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

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

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>Notes</Typography>
      <Button variant="contained" onClick={() => setFormOpen(true)} sx={{ marginBottom: 2 }}>
        Add Note
      </Button>
      <NoteForm
        open={formOpen}
        onClose={handleClose}
        editingNote={editingNote}
      />
    </Container>
  );
}

export default App;