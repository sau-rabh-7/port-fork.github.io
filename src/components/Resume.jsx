// src/components/Resume.jsx
import React from 'react';
import { BookOpen } from '@phosphor-icons/react'; // Assuming BookOpen for both education and experience

const Resume = ({ resumeData }) => {
  return (
    <article className="
      resume bg-eerie-black-2 border border-jet rounded-2xl p-4 shadow-1 z-10
      md:w-[520px] md:mx-auto md:p-8
      lg:w-[950px] lg:p-8 lg:shadow-5 lg:min-h-full
    ">
      <header>
        <h2 className="h2 article-title relative text-white-2 text-2xl font-semibold capitalize pb-2 mb-4 md:text-4xl md:pb-4">
          Resume
          <span className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-orange-yellow-crayola to-orange-yellow-crayola rounded-sm md:w-10 md:h-[5px]"></span>
        </h2>
      </header>

      {/* Education */}
      <section className="timeline mb-8 md:mb-8">
        <div className="title-wrapper flex items-center gap-4 mb-6 md:mb-6">
          <div className="icon-box relative bg-gradient-to-br from-jet via-onyx to-jet w-[30px] h-[30px] rounded-lg flex justify-center items-center text-base text-orange-yellow-crayola shadow-1 z-10 md:w-12 md:h-12 md:rounded-xl md:text-lg">
            <BookOpen size={20} />
            <div className="absolute inset-px rounded-inherit bg-eerie-black-1 -z-10"></div>
          </div>
          <h3 className="h3 text-white-2 text-2xl font-semibold capitalize">Education</h3>
        </div>

        <ol className="timeline-list text-base ml-12 md:ml-16">
          {resumeData.education.map((item, index) => (
            <li key={index} className="timeline-item relative pl-8 pb-5 md:pl-10">
              <h4 className="h4 timeline-item-title text-white-2 text-base font-normal leading-tight mb-2">{item.title}</h4>
              <span className="text-vegas-gold text-base font-normal leading-relaxed">{item.year}</span>
              <p className="timeline-text text-light-gray text-base font-light leading-relaxed mt-2 md:max-w-3xl">
                {item.description}
              </p>
              {index < resumeData.education.length - 1 && (
                <div className="absolute top-[-25px] left-[-30px] w-px h-[calc(100%+50px)] bg-jet md:left-[-40px]"></div>
              )}
              <div className="absolute top-[5px] left-[-33px] h-1.5 w-1.5 bg-gradient-to-r from-orange-yellow-crayola to-orange-yellow-crayola rounded-full shadow-[0_0_0_4px_theme('colors.jet')] md:h-2 md:w-2 md:left-[-43px]"></div>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section className="timeline mb-8 md:mb-8">
        <div className="title-wrapper flex items-center gap-4 mb-6 md:mb-6">
          <div className="icon-box relative bg-gradient-to-br from-jet via-onyx to-jet w-[30px] h-[30px] rounded-lg flex justify-center items-center text-base text-orange-yellow-crayola shadow-1 z-10 md:w-12 md:h-12 md:rounded-xl md:text-lg">
            <BookOpen size={20} /> {/* Can use a different icon if preferred */}
            <div className="absolute inset-px rounded-inherit bg-eerie-black-1 -z-10"></div>
          </div>
          <h3 className="h3 text-white-2 text-2xl font-semibold capitalize">Experience</h3>
        </div>

        <ol className="timeline-list text-base ml-12 md:ml-16">
          {resumeData.experience.map((item, index) => (
            <li key={index} className="timeline-item relative pl-8 pb-5 md:pl-10">
              <h4 className="h4 timeline-item-title text-white-2 text-base font-normal leading-tight mb-2">{item.title}</h4>
              <span className="text-vegas-gold text-base font-normal leading-relaxed">{item.year}</span>
              <p className="timeline-text text-light-gray text-base font-light leading-relaxed mt-2 md:max-w-3xl">
                {item.description}
              </p>
              {index < resumeData.experience.length - 1 && (
                <div className="absolute top-[-25px] left-[-30px] w-px h-[calc(100%+50px)] bg-jet md:left-[-40px]"></div>
              )}
              <div className="absolute top-[5px] left-[-33px] h-1.5 w-1.5 bg-gradient-to-r from-orange-yellow-crayola to-orange-yellow-crayola rounded-full shadow-[0_0_0_4px_theme('colors.jet')] md:h-2 md:w-2 md:left-[-43px]"></div>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className="skill">
        <h3 className="h3 skills-title text-white-2 text-2xl font-semibold capitalize mb-5">My skills</h3>
        <ul className="skills-list relative bg-gradient-to-br from-jet via-onyx to-jet p-4 rounded-2xl shadow-2 z-10 md:p-5">
          <div className="absolute inset-px rounded-inherit bg-gradient-to-br from-eerie-black-1 via-eerie-black-2 to-eerie-black-1 -z-10"></div>
          {resumeData.skills.map((skill, index) => (
            <li key={index} className={`skills-item ${index < resumeData.skills.length - 1 ? 'mb-4 md:mb-6' : ''}`}>
              <div className="title-wrapper flex items-center gap-1 mb-2">
                <h5 className="h5 text-white-2 text-xs font-medium mr-1 capitalize">{skill.name}</h5>
                {skill.icon} {/* Render skill icon */}
                <data className="text-light-gray text-xs font-light ml-auto">{skill.value}%</data>
              </div>
              <div className="skill-progress-bg bg-jet w-full h-2 rounded-lg">
                <div className="skill-progress-fill bg-gradient-to-r from-orange-yellow-crayola to-orange-yellow-crayola h-full rounded-inherit" style={{ width: `${skill.value}%` }}></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Resume;
