const API = 'https://rickandmortyapi.com/api/character';

export async function fetchCharacters({ page = 1, name = '' } = {}) {
  const params = new URLSearchParams();
  if (page > 1) params.set('page', page);
  if (name.trim()) params.set('name', name.trim());
  const url = params.toString() ? `${API}?${params}` : API;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) return { results: [], info: { pages: 0, count: 0 } };
    throw new Error('Error al cargar personajes');
  }
  return res.json();
}
