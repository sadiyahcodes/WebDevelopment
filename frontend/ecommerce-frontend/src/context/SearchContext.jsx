import React, { createContext, useContext, useState } from 'react';

// Search Context
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const updateSearch = (query, category = 'All Categories') => {
    setSearchQuery(query);
    setSelectedCategory(category);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      selectedCategory,
      updateSearch,
      clearSearch,
      setSelectedCategory
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};