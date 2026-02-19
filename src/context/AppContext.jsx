import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const isFavorite = useCallback((id) => favorites.some((c) => c.id === id), [favorites]);

  const removeFavorite = useCallback((id) => {
    setFavorites((p) => p.filter((c) => c.id !== id));
    setSelectedCharacter((sc) => (sc?.id === id ? null : sc));
  }, []);

  const toggleFavorite = useCallback((char) => {
    setFavorites((p) =>
      p.some((c) => c.id === char.id) ? p.filter((c) => c.id !== char.id) : [...p, char]
    );
  }, []);

  const value = {
    favorites,
    selectedCharacter,
    setSelectedCharacter,
    isFavorite,
    removeFavorite,
    toggleFavorite,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
