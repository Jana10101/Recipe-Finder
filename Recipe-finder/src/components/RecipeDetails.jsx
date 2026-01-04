function RecipeDetails({ recipe, onClose, onToggleFavorite, isFavorite }) {
  // Extract ingredients... (same as before)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto text-gray-900 dark:text-gray-100">
        <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">&times;</button>
        <h2 className="text-2xl font-bold mb-4">{recipe.strMeal}</h2>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-64 object-cover rounded mb-4" />
        <p><strong>Category:</strong> {recipe.strCategory}</p>
        <p><strong>Cuisine:</strong> {recipe.strArea}</p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Ingredients:</h3>
        <ul className="list-disc pl-5">
          {ingredients.map((ing, index) => (
            <li key={index}>{ing.measure} {ing.name}</li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2">Instructions:</h3>
        <p className="whitespace-pre-line">{recipe.strInstructions}</p>
        {recipe.strYoutube && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Video Tutorial:</h3>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {recipe.strSource && (
          <a href={recipe.strSource} target="_blank" rel="noopener noreferrer" className="block mt-4 text-blue-600 hover:underline dark:text-blue-400">
            Full Recipe Source
          </a>
        )}
        <button onClick={() => onToggleFavorite(recipe)} className="mt-4 text-red-500 hover:text-red-700">
          {isFavorite ? '❤️ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default RecipeDetails;