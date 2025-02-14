import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button to open the nav */}
      <button
        className='absolute left-0 top-0 bg-white p-3 rounded md:hidden z-20'
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon />
      </button>

      {/* Navigation menu */}
      <nav
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-50 p-5 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-10`}
      >
        {/* Close button positioned below the title */}
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-xl font-bold'>To do App</h1>
          <button
            className='p-2 md:hidden'
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation links */}
        <ul>
          {['Home', 'Tasks', 'Completed', 'Personal', 'Work'].map((item) => (
            <li
              key={item}
              className={`cursor-pointer p-2 rounded-lg ${
                active === item ? 'bg-gray-700' : 'hover:bg-gray-200 hover:text-black'
              }`}
              onClick={() => setActive(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;