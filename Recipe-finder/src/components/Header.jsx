import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ favoritesCount }) {
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <svg 
              className="w-8 h-8 text-orange-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
              />
            </svg>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Recipe Finder
            </h1>
          </Link>

          <Link 
            to="/favorites"
            className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg transition-all transform hover:scale-105"
          >
            <svg 
              className="w-5 h-5" 
              fill={location.pathname === '/favorites' ? 'currentColor' : 'none'}
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
            <span className="font-medium">Favorites</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-orange-500 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                {favoritesCount}
              </span>
            )}
          </Link>
        </div>
        <p className="text-center text-gray-600 mt-2">
          Discover delicious recipes from around the world
        </p>
      </div>
    </header>
  );
}

export default Header;