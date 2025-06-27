// src/components/About.jsx
import React, { useState } from 'react';
import { Quote } from '@phosphor-icons/react'; // For the quote icon in testimonials modal

const About = ({ aboutData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    avatar: '',
    name: '',
    date: '',
    text: '',
  });

  const openTestimonialModal = (testimonial) => {
    setModalContent({
      avatar: testimonial.avatar,
      name: testimonial.name,
      date: testimonial.date,
      text: testimonial.text,
    });
    setModalOpen(true);
  };

  const closeTestimonialModal = () => {
    setModalOpen(false);
  };

  return (
    <article className="
      about bg-eerie-black-2 border border-jet rounded-2xl p-4 shadow-1 z-10
      md:w-[520px] md:mx-auto md:p-8
      lg:w-[950px] lg:p-8 lg:shadow-5 lg:min-h-full
    ">
      <header>
        <h2 className="h2 article-title relative text-white-2 text-2xl font-semibold capitalize pb-2 mb-4 md:text-4xl md:pb-4">
          About me
          <span className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-orange-yellow-crayola to-orange-yellow-crayola rounded-sm md:w-10 md:h-[5px]"></span>
        </h2>
      </header>

      <section className="about-text text-light-gray text-base font-light leading-relaxed mb-8 md:mb-10">
        {aboutData.introText.map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </section>

      {/* Services */}
      <section className="service mb-8 md:mb-10">
        <h3 className="h3 service-title text-white-2 text-2xl font-semibold capitalize mb-5">What I'm doing</h3>
        <ul className="service-list grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-5 lg:gap-x-8">
          {aboutData.services.map((service, index) => (
            <li key={index} className="service-item relative bg-gradient-to-br from-jet via-onyx to-jet p-5 rounded-2xl shadow-2 z-10 md:flex md:items-start md:gap-4 md:p-8">
              <div className="absolute inset-px rounded-inherit bg-gradient-to-br from-eerie-black-1 via-eerie-black-2 to-eerie-black-1 -z-10"></div>
              <div className="service-icon-box w-10 h-10 flex justify-center items-center mx-auto mb-2 md:mx-0 md:mb-0">
                <img src={service.icon} alt={`${service.title} icon`} width="40" className="w-10 h-10" />
              </div>
              <div className="service-content-box text-center md:text-left">
                <h4 className="h4 service-item-title text-white-2 text-lg font-medium capitalize mb-2">{service.title}</h4>
                <p className="service-item-text text-light-gray text-base font-light leading-relaxed">{service.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonials */}
      <section className="testimonials mb-8 md:mb-10">
        <h3 className="h3 testimonials-title text-white-2 text-2xl font-semibold capitalize mb-5">Testimonials</h3>
        <ul className="testimonials-list flex justify-start items-start gap-4 mx-[-15px] px-4 pb-8 overflow-x-auto scroll-smooth snap-x snap-mandatory has-scrollbar md:mx-[-30px] md:px-8 md:pb-8 lg:gap-8">
          {aboutData.testimonials.map((testimonial, index) => (
            <li key={index} className="testimonials-item min-w-full snap-center md:min-w-[calc(50%-15px)]">
              <div className="content-card relative bg-gradient-to-br from-jet via-onyx to-jet p-4 pt-12 rounded-2xl shadow-2 cursor-pointer z-10 md:p-8 md:pt-6"
                onClick={() => openTestimonialModal(testimonial)}>
                <div className="absolute inset-px rounded-inherit bg-gradient-to-br from-eerie-black-1 via-eerie-black-2 to-eerie-black-1 -z-10"></div>
                <figure className="testimonials-avatar-box absolute top-0 left-0 transform translate-x-4 translate-y-[-25px] bg-gradient-to-br from-onyx via-eerie-black-1 to-onyx rounded-2xl shadow-1 md:translate-x-8 md:translate-y-[-30px]">
                  <img src={testimonial.avatar} alt={testimonial.name} width="60" className="w-auto md:w-20" />
                </figure>
                <h4 className="h4 testimonials-item-title text-white-2 text-lg font-medium mb-2 md:mb-3 md:ml-[95px]">{testimonial.name}</h4>
                <div className="testimonials-text text-light-gray text-base font-light leading-relaxed line-clamp-4 md:line-clamp-2">
                  <p>{testimonial.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Testimonials Modal */}
      {modalOpen && (
        <div className={`modal-container fixed top-0 left-0 w-full h-full flex justify-center items-center overflow-y-auto overscroll-contain z-[20] ${modalOpen ? 'active' : ''}`}>
          <div className={`overlay fixed top-0 left-0 w-full h-screen bg-black opacity-80 z-[1] transition-opacity duration-250 ${modalOpen ? 'active' : ''}`} onClick={closeTestimonialModal}></div>
          <section className="testimonials-modal relative bg-eerie-black-2 p-4 m-4 border border-jet rounded-2xl shadow-5 transform scale-120 opacity-0 transition-all duration-250 z-[2] active md:flex md:items-stretch md:gap-6 md:p-8 md:max-w-xl lg:max-w-3xl">
            <button className="modal-close-btn absolute top-4 right-4 bg-onyx rounded-lg w-8 h-8 flex justify-center items-center text-white-2 text-lg opacity-70 hover:opacity-100" onClick={closeTestimonialModal}>
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <div className="modal-img-wrapper flex flex-col items-center">
              <figure className="modal-avatar-box bg-gradient-to-br from-onyx via-eerie-black-1 to-onyx w-max rounded-2xl mb-4 shadow-2 md:rounded-lg">
                <img src={modalContent.avatar} alt={modalContent.name} width="80" className="w-auto md:w-[80px]" />
              </figure>
              <Quote size={35} className="text-white-2 opacity-50 block flex-grow" /> {/* Phosphor icon for quote */}
            </div>
            <div className="modal-content">
              <h4 className="h3 modal-title text-white-2 text-2xl font-semibold capitalize mb-1 md:text-3xl">{modalContent.name}</h4>
              <time dateTime={modalContent.date.replace(/ /g, '-')} className="text-base text-light-gray-70 font-light mb-3 block">{modalContent.date}</time>
              <p className="text-light-gray text-base font-light leading-relaxed">{modalContent.text}</p>
            </div>
          </section>
        </div>
      )}

      {/* Clients */}
      <section className="clients mb-4 md:mb-4">
        <h3 className="h3 clients-title text-white-2 text-2xl font-semibold capitalize mb-5">Clients</h3>
        <ul className="clients-list flex justify-start items-start gap-4 mx-[-15px] px-4 pb-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scroll-padding-inline-4 has-scrollbar md:mx-[-30px] md:px-8 md:pb-8 md:gap-x-12">
          {aboutData.clients.map((client, index) => (
            <li key={index} className="clients-item min-w-[50%] snap-start md:min-w-[calc(33.33%-10px)] lg:min-w-[calc(25%-38px)]">
              <a href="#">
                <img src={client.logo} alt={client.name} className="w-full grayscale hover:grayscale-0 transition-filter duration-250" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default About;
