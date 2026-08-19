import { useDispatch, useSelector } from 'react-redux';
import { removeNote } from '../features/notes/notesSlice';
import NoteCard from './NoteCard';

function NoteList({ onEdit, sortOrder }) {
  const dispatch = useDispatch();
  const { items, status, error, filter } = useSelector((state) => state.notes);

  const onDelete = (id) => {
    dispatch(removeNote(id));
  };

  const filteredNotes = filter
    ? items.filter((note) => note.category === filter)
    : items;

  const sortedNotes = [...filteredNotes].sort((a, b) =>
    sortOrder === 'desc'
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;
  if (sortedNotes.length === 0) {
    return (
      <p>
        {filter
          ? `No notes in category "${filter}".`
          : 'Not a single note here..'}
      </p>
    );
  }


  return (
    <div>
      {sortedNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default NoteList;