import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

    return (
    <>
      <button 
      className='absolute left-0 top-0 bg-white p-3 rounded md:hidden left-2'
      onClick = {() => setIsOpen(!isOpen)}>
         <MenuIcon />
      </button>

      <nav className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-60 p-5 transform ${isOpen ? "translate-x-0" : "-translate-x-full z-100"} md:translate-x-0 transition-transform`}>
        <h1 className='text-xl font-bold mb-5' >To do App</h1>
        <ul>
          {["Home", "Tasks", "Completed", "Personal", "Work"].map((item) => (
              <li key={item} className={`cursor-pointer p-3 rounded-lg ${
                  active === item ? "bg-gray-700" : "hover:bg-gray-200 hover:text-black"
              }`} >{item}</li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
