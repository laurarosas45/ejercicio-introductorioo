import { useState, useEffect } from 'react';
import { fetchCharacters } from '../services/api';
import { CharacterCard } from './CharacterCard';
import { Pagination } from './Pagination';

const defaultInfo = { pages: 1, count: 0 };

export function CharacterList({ search }) {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState(defaultInfo);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => setPage(1), [search]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchCharacters({ page, name: search })
      .then((data) => {
        setCharacters(data.results ?? []);
        setInfo(data.info ?? defaultInfo);
      })
      .catch((err) => {
        setError(err.message);
        setCharacters([]);
      })
      .finally(() => setLoading(false));
  }, [page, search]);

  if (error) {
    return (
      <section className="charlist-section">
        <p className="charlist-error">{error}</p>
        {search && <p className="charlist-hint">Prueba con otro nombre.</p>}
      </section>
    );
  }

  return (
    <section className="charlist-section" aria-label="Lista de personajes">
      {loading ? (
        <p className="charlist-loading">Cargando personajes...</p>
      ) : (
        <>
          <div className="charlist-grid">
            {characters.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={info.pages || 1}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
}
