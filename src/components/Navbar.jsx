import React, { useState } from "react";
import { useEffect } from "react";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-white font-mono transition duration-300 ease-in-out hover:text-blue-500">
          Logo
        </a>

        {/* Links and Button */}
        <div className="flex items-center">
          {/* Links */}
          <div className="hidden md:flex items-center space-x-4 font-mono">
            <a href="#" className="text-gray-300 transition duration-300 ease-in-out hover:text-blue-500">
              Link 1
            </a>
            <a href="#" className="text-gray-300 transition duration-300 ease-in-out hover:text-blue-500">
              Link 2
            </a>

            {/* Dropdown */}
            <div className="relative">
              <button onClick={toggleDropdown} className="text-gray-300 transition duration-300 ease-in-out hover:text-blue-500">
                Dropdown
              </button>
              {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-md">
                  <ul className="text-gray-300">
                    <li>
                      <a href="#" className="block px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-700">
                        Option 1
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-700">
                        Option 2
                      </a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-700">
                        Option 3
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* Search bar */}
{showSearch && (
  <form className="hidden md:flex w-1/3">
    <input
      type="text"
      placeholder="Search for your domain"
      className="w-full px-4 py-2 rounded-l-lg focus:outline-none bg-gray-900 text-white"
    />
    <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg font-mono transition duration-300 ease-in-out hover:bg-blue-600">
      Search
    </button>
  </form>
)}

          </div>

          {/* Divider */}
          <div className="mx-4 border-l-2 border-gray-700 h-5"></div>

          {/* Button */}
          <button className="rounded-md bg-blue-500 text-white px-4 py-2 font-mono transition duration-300 ease-in-out hover:bg-blue-600">
            Button
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
