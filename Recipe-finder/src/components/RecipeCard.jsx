function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{recipe.strMeal}</h2>
        <p className="text-gray-600">Category: {recipe.strCategory}</p>
        <p className="text-gray-600">Cuisine: {recipe.strArea}</p>
        {/* Button for details - functionality in Week 3 */}
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View Details
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;