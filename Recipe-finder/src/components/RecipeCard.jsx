function RecipeCard({ recipe, onClick, onToggleFavorite, isFavorite }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">{recipe.strMeal}</h2>
        <p className="text-gray-600 dark:text-gray-300">Category: {recipe.strCategory}</p>
        <p className="text-gray-600 dark:text-gray-300">Cuisine: {recipe.strArea}</p>
        <div className="flex justify-between mt-4">
          <button onClick={onClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Details
          </button>
          <button onClick={() => onToggleFavorite(recipe)} className="text-red-500 hover:text-red-700">
            {isFavorite ? '❤️ Remove Favorite' : '♡ Add Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;