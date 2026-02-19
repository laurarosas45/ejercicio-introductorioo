import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CharacterList } from '../components/CharacterList';
import { SearchBar } from '../components/SearchBar';
import { useApp } from '../context/AppContext';

export function HomePage() {
  const [search, setSearch] = useState('');
  const { favorites } = useApp();

  return (
    <>
      <div className="app-toolbar">
        <SearchBar onSearch={setSearch} placeholder="Buscar por nombre..." />
        <Link to="/favoritos" className="fav-link">
          Favoritos{favorites.length ? ` (${favorites.length})` : ''}
        </Link>
      </div>
      <CharacterList search={search} />
    </>
  );
}
