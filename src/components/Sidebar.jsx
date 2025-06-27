// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({ personalInfo, sidebarActive, setSidebarActive }) => {
  return (
    <aside
      className={`
        sidebar
        bg-eerie-black-2 border border-jet rounded-2xl p-4 shadow-1 z-10
        mb-4 max-h-[112px] overflow-hidden transition-all duration-500 ease-in-out
        md:w-[520px] md:mx-auto md:mb-8 md:max-h-[180px]
        lg:sticky lg:top-[60px] lg:max-h-max lg:h-full lg:mb-0 lg:pt-[60px] lg:w-auto
        ${sidebarActive ? 'active max-h-[405px] md:max-h-[584px]' : ''}
      `}
    >
      <div className="sidebar-info relative flex justify-start items-center gap-4 md:gap-6 lg:flex-col">
        <figure className="avatar-box bg-gradient-to-br from-onyx via-eerie-black-1 to-onyx rounded-2xl md:rounded-[30px]">
          <img src={personalInfo.avatar} alt={personalInfo.name} width="80" className="w-auto md:w-[120px] lg:w-[150px]" />
        </figure>

        <div className="info-content">
          <h1 className="name text-white-2 text-fs-3 font-medium tracking-tight mb-2 md:mb-4 lg:whitespace-nowrap lg:text-center" title={personalInfo.name}>
            {personalInfo.name}
          </h1>
          <p className="title text-white-1 bg-onyx text-fs-8 font-light w-max px-3 py-1 rounded-lg md:px-[18px] md:py-[5px] lg:mx-auto">
            {personalInfo.title}
          </p>
        </div>

        <button
          className="
            info_more-btn absolute top-[-15px] right-[-15px] rounded-bl-2xl md:rounded-bl-[30px]
            bg-gradient-to-br from-onyx via-jet to-jet
            text-orange-yellow-crayola text-[13px] px-2 py-1 shadow-2 transition-all duration-300 z-10
            md:top-[-30px] md:right-[-30px] md:px-[15px] md:py-[10px] md:text-fs-8
            lg:hidden
          "
          onClick={() => setSidebarActive(!sidebarActive)}
        >
          <span className="hidden md:block">Show Contacts</span>
          <ion-icon name="chevron-down" className="block md:hidden"></ion-icon>
          <div className="absolute inset-px rounded-inherit bg-gradient-to-br from-eerie-black-1 via-eerie-black-2 to-eerie-black-1 -z-10 transition-all duration-300"></div>
        </button>
      </div>

      <div className={`sidebar-info_more transition-all duration-500 ease-in-out ${sidebarActive ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="separator w-full h-px bg-jet my-4 md:my-8 lg:my-4"></div>

        <ul className="contacts-list grid grid-cols-1 gap-4 md:gap-x-4 md:gap-y-5 lg:gap-4">
          {personalInfo.contact.map((item, index) => (
            <li className="contact-item flex items-center gap-4 min-w-full" key={index}>
              <div className="icon-box relative bg-gradient-to-br from-jet via-onyx to-jet w-[30px] h-[30px] rounded-lg flex justify-center items-center text-base text-orange-yellow-crayola shadow-1 z-10 md:w-12 md:h-12 md:rounded-xl md:text-lg">
                {item.icon}
                <div className="absolute inset-px rounded-inherit bg-eerie-black-1 -z-10"></div>
              </div>
              <div className="contact-info max-w-[calc(100%-46px)] w-[calc(100%-46px)] md:max-w-[calc(100%-64px)] md:w-[calc(100%-64px)]">
                <p className="contact-title text-light-gray-70 text-fs-8 uppercase mb-0.5">{item.title}</p>
                {item.link ? (
                  <a href={item.link} className="contact-link text-white-2 text-fs-7 lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis">
                    {item.value}
                  </a>
                ) : item.title === "Birthday" ? (
                  <time dateTime={item.value.replace(/ /g, '-').substring(item.value.length - 4) + '-' + (new Date(item.value).getMonth() + 1).toString().padStart(2, '0') + '-' + new Date(item.value).getDate().toString().padStart(2, '0')} className="text-white-2 text-fs-7 lg:text-fs-7 font-light">
                    {item.value}
                  </time>
                ) : (
                  <address className="text-white-2 text-fs-7 not-italic lg:text-fs-7 font-light">
                    {item.value}
                  </address>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="separator w-full h-px bg-jet my-4 md:my-8 opacity-100 lg:opacity-0 lg:my-4"></div> {/* Last separator is hidden on large screens */}

        <ul className="social-list flex justify-start items-center gap-4 pb-1 pl-2 md:pl-0 lg:justify-center">
          {personalInfo.socialLinks.map((item, index) => (
            <li className="social-item" key={index}>
              <a href={item.link} className="social-link text-light-gray-70 text-lg hover:text-light-gray transition-colors duration-200">
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
