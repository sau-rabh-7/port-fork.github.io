// src/App.jsx
import React, { useState, useEffect } from 'react';
import SilkBackground from './components/SilkBackground'; // Your background component
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Contact from './components/Contact';
import portfolioData from './data/portfolioData'; // Your centralized data

function App() {
  const [activePage, setActivePage] = useState('About'); // State to manage active section
  const [sidebarActive, setSidebarActive] = useState(false); // State for sidebar toggle on mobile

  // Effect to handle IonIcons loading, similar to your original script.js
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
    document.body.appendChild(script);

    const scriptNomodule = document.createElement('script');
    scriptNomodule.setAttribute('nomodule', '');
    scriptNomodule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
    document.body.appendChild(scriptNomodule);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(scriptNomodule);
    };
  }, []);

  return (
    <div className="min-h-screen relative font-poppins text-light-gray bg-smoky-black">
      {/* Silk Background */}
      <SilkBackground />

      <main className="relative z-10 max-w-[1200px] mx-auto py-4 px-3 md:pt-[60px] md:pb-[100px] lg:flex lg:justify-center lg:items-stretch lg:gap-6">
        {/* Sidebar */}
        <Sidebar
          personalInfo={portfolioData.personalInfo}
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
        />

        {/* Main Content Area */}
        <div className="main-content w-full md:w-[520px] lg:w-3/4 mx-auto md:mx-auto relative">
          {/* Navbar */}
          <Navbar activePage={activePage} setActivePage={setActivePage} />

          {/* Conditional Rendering of Sections */}
          <section
            className={`article ${activePage === 'About' ? 'active' : 'hidden'} mt-[15px] md:mt-[30px] lg:mt-0`}
            style={{ animation: activePage === 'About' ? 'fade 0.5s ease backwards' : 'none' }}
          >
            <About
              aboutData={portfolioData.about}
            />
          </section>

          <section
            className={`article ${activePage === 'Resume' ? 'active' : 'hidden'} mt-[15px] md:mt-[30px] lg:mt-0`}
            style={{ animation: activePage === 'Resume' ? 'fade 0.5s ease backwards' : 'none' }}
          >
            <Resume
              resumeData={portfolioData.resume}
            />
          </section>

          <section
            className={`article ${activePage === 'Portfolio' ? 'active' : 'hidden'} mt-[15px] md:mt-[30px] lg:mt-0`}
            style={{ animation: activePage === 'Portfolio' ? 'fade 0.5s ease backwards' : 'none' }}
          >
            <Portfolio
              portfolioData={portfolioData.portfolio}
            />
          </section>

          <section
            className={`article ${activePage === 'Blog' ? 'active' : 'hidden'} mt-[15px] md:mt-[30px] lg:mt-0`}
            style={{ animation: activePage === 'Blog' ? 'fade 0.5s ease backwards' : 'none' }}
          >
            <Blog
              blogData={portfolioData.blog}
            />
          </section>

          <section
            className={`article ${activePage === 'Contact' ? 'active' : 'hidden'} mt-[15px] md:mt-[30px] lg:mt-0`}
            style={{ animation: activePage === 'Contact' ? 'fade 0.5s ease backwards' : 'none' }}
          >
            <Contact
              contactData={portfolioData.contact}
            />
          </section>

        </div>
      </main>
    </div>
  );
}

export default App;
