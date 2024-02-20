import React from "react";
//import Searchbar from "./Searchbar";

const Header = () => {
  return (
    <nav className="flex items-center justify-between w-full bg-gray-900 text-white ">
      <div>
        <ul className="flex items-center justify-between gap-8 m-5">
          <li>Home</li>
          <li>About</li>
          <li>Product</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;