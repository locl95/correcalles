import React, { ChangeEvent } from 'react';

interface SearchProps {
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ setSearchQuery, placeholder = "Search..." }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;