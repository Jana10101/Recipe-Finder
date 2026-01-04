import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import Loader from './components/Loader';
import Navbar from './components/Navbar';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState('search'); // 'search' or 'favorites'
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setRecipes([]);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (recipe) => setSelectedRecipe(recipe);
  const closeDetails = () => setSelectedRecipe(null);

  const toggleFavorite = (recipe) => {
    if (favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
      setFavorites(favorites.filter((fav) => fav.idMeal !== recipe.idMeal));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const isFavorite = (recipe) => favorites.some((fav) => fav.idMeal === recipe.idMeal);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar onToggleDark={toggleDarkMode} darkMode={darkMode} onViewChange={setView} />
      <main className="container mx-auto p-4">
        {view === 'search' ? (
          <>
            <SearchBar onSearch={handleSearch} />
            {loading && <Loader />}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <RecipeList
              recipes={recipes}
              onSelect={openDetails}
              onToggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          </>
        ) : (
          <RecipeList
            recipes={favorites}
            onSelect={openDetails}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </main>
      {selectedRecipe && (
        <RecipeDetails
          recipe={selectedRecipe}
          onClose={closeDetails}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite(selectedRecipe)}
        />
      )}
    </div>
  );
}

export default App;