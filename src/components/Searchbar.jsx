import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import product_data from "../data/prodData";

const Searchbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const filteredData = product_data.filter((item) =>
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearch(filteredData);
  };

  // Filter the data based on the search query
  const filteredData = product_data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex items-center p-2 space-x-6 rounded-xl">
      <div className="flex bg-gray-100 p-2 w-62 space-x-4 rounded-lg">
        <FaSearch className="h-6 w-6 opacity-30" />
        <input
          className="bg-gray-100 outline-none"
          type="text"
          placeholder="Type to search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <div
        className="bg-gray-800 py-2 px-5 text-white font-semibold rounded-md hover:shadow-lg transition duration-3000 cursor-pointer"
        onClick={handleSearchClick}
      >
        <span>Search</span>
      </div>
    </div>
  );
};

export default Searchbar;