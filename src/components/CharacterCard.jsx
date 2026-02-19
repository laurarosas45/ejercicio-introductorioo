import { useApp } from '../context/AppContext';
import { getStatusClass } from '../utils/status';

export function CharacterCard({ character, showRemoveFromFavorites = false }) {
  const { setSelectedCharacter, isFavorite, toggleFavorite, removeFavorite } = useApp();
  const isFav = showRemoveFromFavorites || isFavorite(character.id);
  const statusClass = getStatusClass(character.status);

  const onCard = (e) => !e.target.closest('button') && setSelectedCharacter(character);
  const onFav = (e) => {
    e.stopPropagation();
    showRemoveFromFavorites ? removeFavorite(character.id) : toggleFavorite(character);
  };

  return (
    <article className="character-card" onClick={onCard} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onCard(e)}>
      <div className="character-card-imageWrap">
        <img src={character.image} alt={character.name} className="character-card-image" />
        <span className={`character-card-status ${statusClass}`}>{character.status}</span>
      </div>
      <div className="character-card-body">
        <h3 className="character-card-name">{character.name}</h3>
        <p className="character-card-meta">{character.species} · {character.gender}</p>
        <button type="button" className="character-card-favBtn" onClick={onFav} aria-label={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}>
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
    </article>
  );
}
