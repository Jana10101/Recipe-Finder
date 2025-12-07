import { useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import RecipeList from '../components/RecipeList.jsx';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Recipe Finder</h1>
      <SearchBar setRecipes={setRecipes} setLoading={setLoading} setError={setError} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <RecipeList recipes={recipes} loading={loading} />
    </div>
  );
}

export default Home;