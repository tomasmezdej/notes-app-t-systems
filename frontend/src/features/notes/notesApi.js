/* obycajne by som pouzil axios ale kedze to nieje spomenute v zadani tak nie */

const API_URL = process.env.REACT_APP_API_URL;

export const fetchNotes = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createNote = async (note) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const updateNote = async (id, note) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const deleteNote = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return id;
};