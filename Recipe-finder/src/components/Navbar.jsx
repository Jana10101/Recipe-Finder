function Navbar({ onToggleDark, darkMode, onViewChange }) {
  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">Recipe Finder</h1>
      <div className="flex space-x-4">
        <button onClick={() => onViewChange('search')} className="hover:underline">Search</button>
        <button onClick={() => onViewChange('favorites')} className="hover:underline">Favorites</button>
        <button onClick={onToggleDark}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
}

export default Navbar;