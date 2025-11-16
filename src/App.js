
import './App.css';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import FavoritesPage from './pages/FavoritesPage';
import RecipePage from './pages/RecipePage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App main_text">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/catalog' element={<CatalogPage />} />
        <Route path='/catalog/:category' element={<CatalogPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
        <Route path='/recipe/:id' element={<RecipePage />} />
      </Routes>
    </div>
  );
}

export default App;
