import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import Header from '../components/Header';
import WelcomeSection from '../components/WelcomeSection';
import LoadingSpinner from '../components/LoadingSpinner';

function Home({ favorites, toggleFavorite, isFavorite }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        searchRecipes();
      } else {
        setRecipes([]);
        setShowWelcome(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchRecipes = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError('');
    setShowWelcome(false);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError('No recipes found. Try searching for something else!');
      }
    } catch (err) {
      setError('Oops! Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Header favoritesCount={favorites.length} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
        />

        {showWelcome && !loading && recipes.length === 0 && (
          <WelcomeSection setSearchTerm={setSearchTerm} />
        )}

        {loading && <LoadingSpinner />}

        {error && (
          <div className="max-w-md mx-auto bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard 
                key={recipe.idMeal}
                recipe={recipe}
                onSelect={() => setSelectedRecipe(recipe)}
                isFavorite={isFavorite(recipe.idMeal)}
                onToggleFavorite={() => toggleFavorite(recipe)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          isFavorite={isFavorite(selectedRecipe.idMeal)}
          onToggleFavorite={() => toggleFavorite(selectedRecipe)}
        />
      )}
    </div>
  );
}

export default Home;