import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { CharacterModal } from './components/CharacterModal';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';

function App() {
  return (
    <AppProvider>
      <div className="app">
        <header className="app-header">
          <h1>Rick & Morty · Personajes</h1>
          <p>Explora los personajes y guarda tus favoritos</p>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
          </Routes>
        </main>
        <CharacterModal />
      </div>
    </AppProvider>
  );
}

export default App;
