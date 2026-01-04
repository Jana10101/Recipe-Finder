function RecipeList({ recipes, onSelect, onToggleFavorite, isFavorite }) {
  if (!recipes?.length) {
    return null; // We handle empty states in parent now
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          onClick={() => onSelect(recipe)}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite(recipe)}
        />
      ))}
    </div>
  );
}