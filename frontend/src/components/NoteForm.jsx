import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem
} from '@mui/material';
import { addNote, editNote } from '../features/notes/notesSlice';
import CATEGORIES from '../constants/categories';

const MAX_TITLE_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 200;

function NoteForm({ open, onClose, editingNote }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
      setCategory(editingNote.category);
    } else {
      setTitle('');
      setDescription('');
      setCategory('');
    }
  }, [editingNote, open]);

  const isTitleTooLong = title.length > MAX_TITLE_LENGTH;
  const isDescriptionTooLong = description.length > MAX_DESCRIPTION_LENGTH;

  const isValid =
    title.trim() &&
    description.trim() &&
    category &&
    !isTitleTooLong &&
    !isDescriptionTooLong;

  const handleSubmit = () => {
    const note = { title, description, category };
    if (editingNote) {
      dispatch(editNote({ id: editingNote.id, note: { ...note, createdAt: editingNote.createdAt } }));
    } else {
      dispatch(addNote({ ...note, createdAt: new Date().toISOString() }));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingNote ? 'Edit Note' : 'Add Note'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: '16px !important' }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          error={isTitleTooLong}
          helperText={
            isTitleTooLong
              ? `Title is too long (${title.length}/${MAX_TITLE_LENGTH})`
              : `${title.length}/${MAX_TITLE_LENGTH}`
          }
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
          error={isDescriptionTooLong}
          helperText={
            isDescriptionTooLong
              ? `Description is too long (${description.length}/${MAX_DESCRIPTION_LENGTH})`
              : `${description.length}/${MAX_DESCRIPTION_LENGTH}`
          }
        />
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        >
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat.name} value={cat.name}>{cat.name}</MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!isValid}>
          {editingNote ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NoteForm;