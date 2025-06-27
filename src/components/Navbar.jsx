// src/components/Navbar.jsx
import React from 'react';

const Navbar = ({ activePage, setActivePage }) => {
  const navItems = ["About", "Resume", "Portfolio", "Blog", "Contact"];

  return (
    <nav className="
      navbar fixed bottom-0 left-0 w-full bg-eerie-black-1/[0.75] backdrop-blur-lg border border-jet
      rounded-t-2xl shadow-2 z-50 px-2
      md:rounded-t-2xl md:px-4
      lg:absolute lg:bottom-auto lg:top-0 lg:left-auto lg:right-0 lg:w-max
      lg:rounded-bl-2xl lg:rounded-tr-none lg:px-4 lg:shadow-none
    ">
      <ul className="navbar-list flex flex-wrap justify-center items-center py-0 px-2 gap-x-2 md:gap-x-5 lg:gap-x-8">
        {navItems.map((item) => (
          <li className="navbar-item" key={item}>
            <button
              className={`
                navbar-link text-light-gray text-fs-8 py-5 px-1
                transition-colors duration-250
                hover:text-light-gray-70
                lg:text-sm lg:font-medium
                ${activePage === item ? 'active text-orange-yellow-crayola' : ''}
              `}
              onClick={() => setActivePage(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
