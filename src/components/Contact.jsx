// src/components/Contact.jsx
import React, { useState, useEffect } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react'; // For send message icon

const Contact = ({ contactData }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
  });
  const [formValid, setFormValid] = useState(false);

  // Update form validity whenever formData changes
  useEffect(() => {
    setFormValid(
      formData.fullname.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.message.trim() !== ''
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
      // In a real app, you'd send this data to a backend server.
      // For this example, we'll just log it.
      console.log('Form submitted:', formData);
      alert('Message sent successfully! (Check console for data)'); // Using alert for simplicity, replace with custom modal in production
      setFormData({ fullname: '', email: '', message: '' }); // Clear form
    } else {
      alert('Please fill in all required fields.'); // Using alert for simplicity
    }
  };

  return (
    <article className="
      contact bg-eerie-black-2 border border-jet rounded-2xl p-4 shadow-1 z-10
      md:w-[520px] md:mx-auto md:p-8
      lg:w-[950px] lg:p-8 lg:shadow-5 lg:min-h-full
    ">
      <header>
        <h2 className="h2 article-title relative text-white-2 text-2xl font-semibold capitalize pb-2 mb-4 md:text-4xl md:pb-4">
          Contact
          <span className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-orange-yellow-crayola to-orange-yellow-crayola rounded-sm md:w-10 md:h-[5px]"></span>
        </h2>
      </header>

      <section className="mapbox relative h-[250px] w-full rounded-2xl mb-8 border border-jet overflow-hidden md:h-[380px]">
        <figure className="h-full">
          <iframe
            src={contactData.mapIframeSrc}
            width="100%"
            height="100%"
            loading="lazy"
            title="Google Maps Location"
            className="border-none grayscale invert"
          ></iframe>
        </figure>
      </section>

      <section className="contact-form mb-4">
        <h3 className="h3 form-title text-white-2 text-2xl font-semibold capitalize mb-5">Contact Form</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-wrapper grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 md:gap-8">
            <input
              type="text"
              name="fullname"
              className="form-input text-white-2 text-base font-normal px-5 py-3 border border-jet rounded-2xl outline-none focus:border-orange-yellow-crayola"
              placeholder="Full name"
              required
              value={formData.fullname}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              className="form-input text-white-2 text-base font-normal px-5 py-3 border border-jet rounded-2xl outline-none focus:border-orange-yellow-crayola"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            className="form-input text-white-2 text-base font-normal px-5 py-3 border border-jet rounded-2xl outline-none focus:border-orange-yellow-crayola
                       min-h-[100px] h-[120px] max-h-[200px] resize-y mb-6"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button
            type="submit"
            disabled={!formValid}
            className="
              form-btn relative w-full bg-gradient-to-br from-jet via-onyx to-jet text-orange-yellow-crayola
              flex justify-center items-center gap-2 px-5 py-3 rounded-2xl text-base capitalize shadow-3 z-10
              transition-all duration-250
              hover:bg-gradient-to-r hover:from-orange-yellow-crayola hover:to-orange-yellow-crayola
              hover:text-white-2 hover:shadow-2
              disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:from-jet disabled:hover:to-jet
              md:w-max md:ml-auto
            "
          >
            <div className="absolute inset-px rounded-inherit bg-gradient-to-br from-eerie-black-1 via-eerie-black-2 to-eerie-black-1 -z-10 transition-all duration-250 hover:bg-transparent"></div>
            <PaperPlaneTilt size={20} />
            <span>Send Message</span>
          </button>
        </form>
      </section>
    </article>
  );
};

export default Contact;
