import React from 'react';

function WelcomeSection({ setSearchTerm }) {
  const suggestions = ['Pasta', 'Chicken', 'Salad', 'Cake', 'Soup'];

  return (
    <div className="text-center py-20 animate-fade-in">
      <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-6">
        <svg 
          className="w-16 h-16 text-orange-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" 
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">
        Welcome to Recipe Finder!
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        Start by searching for your favorite dishes above
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setSearchTerm(suggestion)}
            className="px-6 py-2 bg-white text-orange-500 rounded-full border-2 border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all shadow-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeSection;