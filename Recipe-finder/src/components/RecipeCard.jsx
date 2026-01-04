import React from 'react';

function RecipeCard({ recipe, onSelect, isFavorite, onToggleFavorite }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group transform hover:-translate-y-1 relative"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-medium text-orange-600 shadow-lg">
          {recipe.strCategory}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg 
            className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            fill={isFavorite ? 'currentColor' : 'none'}
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
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
          {recipe.strMeal}
        </h3>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span>{recipe.strArea}</span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;