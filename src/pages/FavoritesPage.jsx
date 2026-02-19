import { Link } from 'react-router-dom';
import { CharacterCard } from '../components/CharacterCard';
import { useApp } from '../context/AppContext';

export function FavoritesPage() {
  const { favorites } = useApp();

  if (!favorites.length) {
    return (
      <section className="charlist-section" aria-label="Favoritos">
        <div className="fav-empty-wrap">
          <p className="fav-empty">Aún no tienes personajes favoritos. Añade algunos desde la lista.</p>
          <Link to="/" className="fav-link">Ir a personajes</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="charlist-section" aria-label="Favoritos">
      <p className="fav-page-back">
        <Link to="/">← Volver a personajes</Link>
      </p>
      <div className="charlist-grid">
        {favorites.map((c) => (
          <CharacterCard key={c.id} character={c} showRemoveFromFavorites />
        ))}
      </div>
    </section>
  );
}
