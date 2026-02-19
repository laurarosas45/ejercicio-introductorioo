import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getStatusClass } from '../utils/status';

export function CharacterModal() {
  const { selectedCharacter, setSelectedCharacter, isFavorite, toggleFavorite } = useApp();
  const char = selectedCharacter;

  useEffect(() => {
    if (!char) return;
    const onEsc = (e) => e.key === 'Escape' && setSelectedCharacter(null);
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [char, setSelectedCharacter]);

  if (!char) return null;

  const onClose = () => setSelectedCharacter(null);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        <div className="modal-content">
          <div className="modal-imageWrap">
            <img src={char.image} alt={char.name} />
            <span className={`modal-status ${getStatusClass(char.status)}`}>{char.status}</span>
          </div>
          <div className="modal-details">
            <h2 id="modal-title" className="modal-name">{char.name}</h2>
            <dl className="modal-list">
              <div><dt>Especie</dt><dd>{char.species || '—'}</dd></div>
              <div><dt>Tipo</dt><dd>{char.type || '—'}</dd></div>
              <div><dt>Género</dt><dd>{char.gender || '—'}</dd></div>
              <div><dt>Origen</dt><dd>{char.origin?.name || '—'}</dd></div>
              <div><dt>Ubicación</dt><dd>{char.location?.name || '—'}</dd></div>
              <div><dt>Episodios</dt><dd>{char.episode?.length ?? 0}</dd></div>
            </dl>
            <button type="button" className="modal-favBtn" onClick={() => toggleFavorite(char)}>
              {isFavorite(char.id) ? '❤️ Quitar de favoritos' : '🤍 Añadir a favoritos'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
