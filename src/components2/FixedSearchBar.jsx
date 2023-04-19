import React, { useState } from 'react';

const FixedSearchBar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(search);
  };

  return (
    <div className="fixed w-full bg-gray-800 p-4 z-50">
      <div className="container mx-auto">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex-shrink-0 mr-16">
            <img
              src="https://via.placeholder.com/100x30"
              alt="Logo"
              className="w-32"
            />
          </div>

          {/* Search bar */}
          <form onSubmit={handleSubmit} className="flex flex-grow ml-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
              placeholder="Search Names or Addresses"
            />
            <button
              type="submit"
              className="px-8 bg-blue-500 text-white font-bold p-4 uppercase border-blue-500 border-t border-b border-r rounded-r-lg transition duration-300 ease-in-out hover:bg-blue-600"
            >
              Search
            </button>
          </form>

          {/* Button on the right side */}
          <button className="ml-16 px-6 py-3 poppins bg-blue-500 text-white font-bold rounded-lg transition duration-300 ease-in-out hover:bg-blue-600">
            Click me
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixedSearchBar;
