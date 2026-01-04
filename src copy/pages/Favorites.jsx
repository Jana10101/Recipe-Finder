import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import Header from '../components/Header';

function Favorites({ favorites, toggleFavorite }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.idMeal === recipeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Header favoritesCount={favorites.length} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">My Favorites</h2>
          <p className="text-gray-600">
            {favorites.length > 0 
              ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'recipe' : 'recipes'}`
              : 'No favorites yet. Start exploring recipes!'}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6">
              <svg 
                className="w-16 h-16 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start adding recipes to your favorites to see them here!
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-105"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              Explore Recipes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((recipe) => (
              <RecipeCard 
                key={recipe.idMeal}
                recipe={recipe}
                onSelect={() => setSelectedRecipe(recipe)}
                isFavorite={true}
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

export default Favorites;