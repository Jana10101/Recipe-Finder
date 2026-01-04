import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="relative">
        <svg 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
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
        <input
          type="text"
          placeholder="Search for recipes... (e.g., Pasta, Chicken, Cake)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-orange-200 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all shadow-sm"
        />
      </div>
    </div>
  );
}

export default SearchBar;