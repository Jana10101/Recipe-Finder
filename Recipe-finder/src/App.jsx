import { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

// Mock data for testing UI
const mockRecipes = [
  {
    idMeal: '1',
    strMeal: 'Spaghetti Carbonara',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg',
  },
  {
    idMeal: '2',
    strMeal: 'Chicken Tikka Masala',
    strCategory: 'Chicken',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
  },
  // Add more mock recipes as needed
];

function App() {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // For now, just log – API in Week 3
    console.log('Searching for:', query);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-2xl font-bold">Recipe Finder</h1>
      </header>
      <main className="container mx-auto p-4">
        <SearchBar onSearch={handleSearch} />
        <RecipeList recipes={recipes} />
      </main>
    </div>
  );
}

export default App;