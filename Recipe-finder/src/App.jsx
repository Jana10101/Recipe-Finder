import { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import Loader from './components/Loader';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-2xl font-bold">Recipe Finder</h1>
      </header>
      <main className="container mx-auto p-4">
        <SearchBar onSearch={handleSearch} />
        {loading && <Loader />}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <RecipeList recipes={recipes} onSelect={openDetails} />
      </main>
      {selectedRecipe && <RecipeDetails recipe={selectedRecipe} onClose={closeDetails} />}
    </div>
  );
}

export default App;