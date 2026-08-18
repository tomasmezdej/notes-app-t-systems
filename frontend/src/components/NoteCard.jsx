import { Card, CardContent, CardActions, Typography, Button, Chip, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CATEGORIES from '../constants/categories';

function NoteCard({ note, onEdit, onDelete }) {
  const categoryColor = CATEGORIES.find((c) => c.name === note.category)?.color || '#757575';

  return (
    <Card sx={{ marginBottom: 2, position: "relative" }}>
      <IconButton
        size="small"
        onClick={() => onEdit(note)}
        sx={{ position: 'absolute', top: 8, right: 40 }}
      >
        <EditNoteIcon  />
      </IconButton>
      <IconButton
        size="small"
        color="error"
        onClick={() => onDelete(note.id)}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <CardContent>
        <Chip
          label={note.category}
          size="small"
          sx={{ backgroundColor: categoryColor, color: 'white', borderRadius: "0px 4px 4px 0px", pl: 4, pr: 2, transform: "translateX(-16px)" }}
        />
        <Typography variant="h6" sx={{pt: 1}}>{note.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(note.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">{note.description}</Typography>
      </CardContent>
    </Card>
  );
}

export default NoteCard;