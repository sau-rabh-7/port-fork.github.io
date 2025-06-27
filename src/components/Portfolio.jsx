// src/components/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { Eye } from '@phosphor-icons/react'; // For eye icon in project hover

const Portfolio = ({ portfolioData }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  // Filter projects based on selected category
  const filteredProjects = portfolioData.projects.filter(project => {
    return selectedCategory === 'All' || project.category === selectedCategory;
  });

  // Handle outside click to close select box
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click target is outside both the select button and the select list
      if (isSelectOpen && !event.target.closest('[data-select]') && !event.target.closest('[data-select-item]')) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSelectOpen]);


  return (
    <article className="
      portfolio bg-eerie-black-2 border border-jet rounded-2xl p-4 shadow-1 z-10
      md:w-[520px] md:mx-auto md:p-8
      lg:w-[950px] lg:p-8 lg:shadow-5 lg:min-h-full
    ">
      <header>
        <h2 className="h2 article-title relative text-white-2 text-2xl font-semibold capitalize pb-2 mb-4 md:text-4xl md:pb-4">
          Portfolio
          <span className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-orange-yellow-crayola to-orange-yellow-crayola rounded-sm md:w-10 md:h-[5px]"></span>
        </h2>
      </header>

      <section className="projects">
        {/* Filter List for larger screens */}
        <ul className="filter-list hidden justify-start items-center gap-6 pl-1 mb-8 md:flex">
          {portfolioData.filters.map(filter => (
            <li className="filter-item" key={filter}>
              <button
                className={`text-light-gray text-base transition-colors duration-250 hover:text-light-gray-70 ${selectedCategory === filter ? 'active text-orange-yellow-crayola' : ''}`}
                onClick={() => setSelectedCategory(filter)}
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>

        {/* Filter Select Box for smaller screens */}
        <div className="filter-select-box relative mb-6 md:hidden" data-select>
          <button
            className={`filter-select bg-eerie-black-2 text-light-gray flex justify-between items-center w-full py-3 px-4 border border-jet rounded-2xl text-base font-light ${isSelectOpen ? 'active' : ''}`}
            onClick={() => setIsSelectOpen(!isSelectOpen)}
          >
            <div className="select-value">{selectedCategory}</div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>

          <ul className={`select-list absolute top-full mt-1 w-full p-1 border border-jet rounded-2xl bg-eerie-black-2 z-20 transition-all duration-150 ease-in-out ${isSelectOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
            {portfolioData.filters.map(filter => (
              <li className="select-item" key={filter}>
                <button
                  data-select-item // Add data attribute for click outside detection
                  className="bg-eerie-black-2 text-light-gray text-base font-light capitalize w-full py-2 px-3 rounded-lg hover:bg-eerie-black-2/70"
                  onClick={() => {
                    setSelectedCategory(filter);
                    setIsSelectOpen(false);
                  }}
                >
                  {filter}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="project-list grid grid-cols-1 gap-8 mb-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <li
              key={index}
              className="project-item active"
              style={{ animation: 'scaleUp 0.25s ease forwards' }}
            >
              <a href={project.link} className="block w-full group"> {/* Added group for hover effects */}
                <figure className="project-img relative w-full h-[200px] rounded-2xl overflow-hidden mb-4 lg:h-auto">
                  <div className="project-item-icon-box
                    bg-jet text-orange-yellow-crayola absolute top-1/2 left-1/2
                    transform -translate-x-1/2 -translate-y-1/2 scale-80 opacity-0 transition-all duration-250 z-10
                    group-hover:scale-100 group-hover:opacity-100
                  ">
                    <Eye size={20} className="w-5 h-5" /> {/* Phosphor Eye icon */}
                  </div>
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-250 group-hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-transparent group-hover:bg-black/50 transition-colors duration-250 z-[1]"></div>
                </figure>
                <h3 className="project-title text-white-2 text-base font-normal capitalize leading-tight ml-2">{project.title}</h3>
                <p className="project-category text-light-gray-70 text-base font-light ml-2">{project.category}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Portfolio;
