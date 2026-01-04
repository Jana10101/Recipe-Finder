import React, { useState, useEffect } from 'react';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Error loading favorites:', e);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        searchRecipes();
      } else {
        setRecipes([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchRecipes = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError('');

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
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.idMeal === recipe.idMeal);
      if (isFavorite) {
        return prev.filter((fav) => fav.idMeal !== recipe.idMeal);
      } else {
        return [...prev, recipe];
      }
    });
  };

  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.idMeal === recipeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Recipe Finder
              </h1>
            </button>

            <button 
              onClick={() => setCurrentPage('favorites')}
              className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill={currentPage === 'favorites' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="font-medium">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-500 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Discover delicious recipes from around the world
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' ? (
          <>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for recipes... (e.g., Pasta, Chicken, Cake)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-orange-200 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Welcome or Loading or Results */}
            {!searchTerm && !loading && recipes.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6">
                  <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome to Recipe Finder!</h2>
                <p className="text-xl text-gray-600 mb-8">Start by searching for your favorite dishes above</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Pasta', 'Chicken', 'Salad', 'Cake', 'Soup'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchTerm(suggestion)}
                      className="px-6 py-2 bg-white text-orange-500 rounded-full border-2 border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              </div>
            )}

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
          </>
        ) : (
          /* Favorites Page */
          <>
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
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No favorites yet</h3>
                <p className="text-gray-600 mb-6">Start adding recipes to your favorites to see them here!</p>
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Explore Recipes
                </button>
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
          </>
        )}
      </main>

      {/* Recipe Modal */}
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

// Recipe Card Component
function RecipeCard({ recipe, onSelect, isFavorite, onToggleFavorite }) {
  return (
    <div onClick={onSelect} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group transform hover:-translate-y-1 relative">
      <div className="relative overflow-hidden h-56">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-orange-600 shadow-lg">
          {recipe.strCategory}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <svg className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">{recipe.strMeal}</h3>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{recipe.strArea}</span>
        </div>
      </div>
    </div>
  );
}

// Recipe Modal Component
function RecipeModal({ recipe, onClose, isFavorite, onToggleFavorite }) {
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-3xl z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800">{recipe.strMeal}</h2>
            <button onClick={onToggleFavorite} className="p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110">
              <svg className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-80 object-cover rounded-2xl shadow-lg mb-6" />
          
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">{recipe.strCategory}</span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{recipe.strArea}</span>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getIngredients(recipe).map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-700">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{recipe.strInstructions}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            {recipe.strYoutube && (
              <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Watch Video
              </a>
            )}
            {recipe.strSource && (
              <a href={recipe.strSource} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-md">
                View Source
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;