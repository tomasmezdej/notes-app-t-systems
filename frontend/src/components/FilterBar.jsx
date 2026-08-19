import { useDispatch, useSelector } from 'react-redux';
import { Chip, Stack, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { setFilter } from '../features/notes/notesSlice';
import CATEGORIES from '../constants/categories';

function FilterBar({ sortOrder, onToggleSort }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.notes.filter);

  return (
    <Stack direction="row" spacing={1} sx={{ marginBottom: 2, flexWrap: 'wrap' }}>
      <Chip
        label="All"
        color={!filter ? 'primary' : 'default'}
        onClick={() => dispatch(setFilter(''))}
      />
      {CATEGORIES.map((cat) => (
        <Chip
          key={cat.name}
          label={cat.name}
          sx={
            filter === cat.name
              ? { backgroundColor: cat.color, color: 'white' }
              : {}
          }
          onClick={() => dispatch(setFilter(cat.name))}
        />
      ))}
      <Button
        size="small"
        startIcon={sortOrder === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        onClick={onToggleSort}
        sx={{ marginLeft: 'auto !important' }}
      >
        {sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
      </Button>
    </Stack>
  );
}

export default FilterBar;