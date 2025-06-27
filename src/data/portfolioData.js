// src/data/portfolioData.js

// Import necessary icons from Phosphor Icons for a consistent look
// Make sure to install phosphor-react: npm install phosphor-react
import { EnvelopeSimple, Phone, CalendarBlank, MapPin, FacebookLogo, TwitterLogo, InstagramLogo, BookOpen, Diamond, Browser, DeviceMobile, Camera, Eye, Quote, User, GraduationCap, Briefcase, Code, Palette, ChartLineUp, Database, FileText } from "@phosphor-icons/react";


const portfolioData = {
  // --- Personal Information ---
  personalInfo: {
    name: "Saurabh Sharma",
    title: "Web Developer",
    avatar: "./assets/images/my-avatar.png", // Path to your avatar image in public/assets/images
    contact: [
      {
        icon: <EnvelopeSimple size={20} />, // Phosphor Icon for Email
        title: "Email",
        value: "saurabh@example.com",
        link: "mailto:saurabh@example.com",
      },
      {
        icon: <Phone size={20} />, // Phosphor Icon for Phone
        title: "Phone",
        value: "+1 (123) 456-7890",
        link: "tel:+11234567890",
      },
      {
        icon: <CalendarBlank size={20} />, // Phosphor Icon for Calendar
        title: "Birthday",
        value: "June 23, 1990",
        link: null, // No link for birthday
      },
      {
        icon: <MapPin size={20} />, // Phosphor Icon for Location
        title: "Location",
        value: "Kathmandu, Nepal",
        link: null, // No link for location
      },
    ],
    socialLinks: [
      {
        icon: <FacebookLogo size={24} />, // Phosphor Icon for Facebook
        link: "#",
      },
      {
        icon: <TwitterLogo size={24} />, // Phosphor Icon for Twitter
        link: "#",
      },
      {
        icon: <InstagramLogo size={24} />, // Phosphor Icon for Instagram
        link: "#",
      },
    ],
  },

  // --- About Section ---
  about: {
    introText: [
      "I'm a passionate Web Developer with a knack for transforming complex problems into simple, beautiful, and intuitive web solutions. I thrive on building functional, user-friendly, and visually appealing websites.",
      "My goal is to effectively convey your message and brand identity through creative design and robust development. I've had the privilege of working with various clients, crafting unique digital experiences.",
    ],
    services: [
      {
        icon: "./assets/images/icon-design.svg",
        title: "Web Design",
        text: "Crafting the most modern and high-quality web designs at a professional level.",
      },
      {
        icon: "./assets/images/icon-dev.svg",
        title: "Web Development",
        text: "High-quality development of websites, ensuring robust and scalable solutions.",
      },
      {
        icon: "./assets/images/icon-app.svg",
        title: "Mobile Apps",
        text: "Professional development of applications for both iOS and Android platforms.",
      },
      {
        icon: "./assets/images/icon-photo.svg",
        title: "Photography",
        text: "Delivering high-quality photography across various categories with a professional touch.",
      },
    ],
    testimonials: [
      {
        avatar: "./assets/images/avatar-1.png",
        name: "Daniel Lewis",
        date: "14 June, 2021",
        text: "Saurabh was fantastic! He created our corporate identity, and we're extremely pleased. His experience and client focus are exceptional. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.",
      },
      {
        avatar: "./assets/images/avatar-2.png",
        name: "Jessica Miller",
        date: "20 August, 2021",
        text: "Working with Saurabh was a pleasure. He understood our vision perfectly and delivered a brilliant website. Highly recommend! Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.",
      },
      {
        avatar: "./assets/images/avatar-3.png",
        name: "Emily Evans",
        date: "05 October, 2021",
        text: "Saurabh's design expertise is truly impressive. He transformed our ideas into a stunning digital presence. Fantastic work! Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.",
      },
      {
        avatar: "./assets/images/avatar-4.png",
        name: "Henry William",
        date: "10 December, 2021",
        text: "Professional, creative, and efficient – Saurabh ticks all the boxes. Our new website is a testament to his skill. Lorem ipsum dolor sit amet, ullamcous cididt consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.",
      },
    ],
    clients: [
      { logo: "./assets/images/logo-1-color.png", name: "Client 1" },
      { logo: "./assets/images/logo-2-color.png", name: "Client 2" },
      { logo: "./assets/images/logo-3-color.png", name: "Client 3" },
      { logo: "./assets/images/logo-4-color.png", name: "Client 4" },
      { logo: "./assets/images/logo-5-color.png", name: "Client 5" },
      { logo: "./assets/images/logo-6-color.png", name: "Client 6" },
    ],
  },

  // --- Resume Section ---
  resume: {
    education: [
      {
        icon: <GraduationCap size={20} />, // Phosphor Icon for Education
        title: "University School of the Arts",
        year: "2007 — 2008",
        description: "Graduated with honors, focusing on digital media and interactive design. Specializing in UI/UX principles.",
      },
      {
        icon: <GraduationCap size={20} />,
        title: "New York Academy of Art",
        year: "2006 — 2007",
        description: "Studied advanced graphic design techniques and visual communication.",
      },
      {
        icon: <GraduationCap size={20} />,
        title: "High School of Art and Design",
        year: "2002 — 2004",
        description: "Developed foundational skills in art, design, and early web technologies.",
      },
    ],
    experience: [
      {
        icon: <Briefcase size={20} />, // Phosphor Icon for Experience
        title: "Creative Director",
        year: "2015 — Present",
        description: "Leading creative strategy and design initiatives for various digital products, managing a team of designers and developers.",
      },
      {
        icon: <Briefcase size={20} />,
        title: "Art Director",
        year: "2013 — 2015",
        description: "Directed visual style and images for product campaigns and overall branding.",
      },
      {
        icon: <Briefcase size={20} />,
        title: "Web Designer",
        year: "2010 — 2013",
        description: "Designed and implemented user interfaces for diverse web applications and marketing sites.",
      },
    ],
    skills: [
      { name: "Web Design", value: 80, icon: <Palette size={20} /> }, // Phosphor Icon
      { name: "Graphic Design", value: 70, icon: <Palette size={20} /> }, // Phosphor Icon
      { name: "Branding", value: 90, icon: <Diamond size={20} /> }, // Phosphor Icon
      { name: "Development (Frontend)", value: 95, icon: <Code size={20} /> }, // Phosphor Icon
      { name: "React.js", value: 85, icon: <Code size={20} /> }, // Phosphor Icon
      { name: "Tailwind CSS", value: 90, icon: <Code size={20} /> }, // Phosphor Icon
      { name: "UI/UX Prototyping", value: 88, icon: <Browser size={20} /> }, // Phosphor Icon
    ],
  },

  // --- Portfolio Section ---
  portfolio: {
    filters: ["All", "Web design", "Applications", "Web development"],
    projects: [
      {
        img: "./assets/images/project-1.jpg",
        title: "Finance Dashboard",
        category: "Web development",
        link: "#",
      },
      {
        img: "./assets/images/project-2.png",
        title: "Orizon Landing Page",
        category: "Web development",
        link: "#",
      },
      {
        img: "./assets/images/project-3.jpg",
        title: "Fundo Design System",
        category: "Web design",
        link: "#",
      },
      {
        img: "./assets/images/project-4.png",
        title: "Brawlhalla Companion",
        category: "Applications",
        link: "#",
      },
      {
        img: "./assets/images/project-5.png",
        title: "DSM. Branding",
        category: "Web design",
        link: "#",
      },
      {
        img: "./assets/images/project-6.png",
        title: "MetaSpark Portfolio",
        category: "Web design",
        link: "#",
      },
      {
        img: "./assets/images/project-7.png",
        title: "Summary API Integration",
        category: "Web development",
        link: "#",
      },
      {
        img: "./assets/images/project-8.jpg",
        title: "Task Manager App",
        category: "Applications",
        link: "#",
      },
      {
        img: "./assets/images/project-9.png",
        title: "Arrival E-commerce",
        category: "Web development",
        link: "#",
      },
    ],
  },

  // --- Blog Section ---
  blog: {
    posts: [
      {
        img: "./assets/images/blog-1.jpg",
        category: "Design",
        date: "Fab 23, 2022",
        title: "Design Conferences in 2022",
        text: "Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.",
        link: "#",
      },
      {
        img: "./assets/images/blog-2.jpg",
        category: "Design",
        date: "Feb 23, 2022",
        title: "Best Fonts Every Designer Needs",
        text: "Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.",
        link: "#",
      },
      {
        img: "./assets/images/blog-3.jpg",
        category: "Design",
        date: "Feb 23, 2022",
        title: "Design Digest #80",
        text: "Excepteur sint occaecat cupidatat no proident, quis nostrum exercitationem ullam corporis suscipit.",
        link: "#",
      },
      {
        img: "./assets/images/blog-4.jpg",
        category: "Design",
        date: "Feb 23, 2022",
        title: "UI Interactions of the Week",
        text: "Enim ad minim veniam, consectetur adipiscing elit, quis nostrud exercitation ullamco laboris nisi.",
        link: "#",
      },
      {
        img: "./assets/images/blog-5.jpg",
        category: "Design",
        date: "Feb 23, 2022",
        title: "The Forgotten Art of Spacing",
        text: "Maxime placeat, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        link: "#",
      },
      {
        img: "./assets/images/blog-6.jpg",
        category: "Design",
        date: "Feb 23, 2022",
        title: "Design Digest #79",
        text: "Optio cumque nihil impedit uo minus quod maxime placeat, velit esse cillum.",
        link: "#",
      },
    ],
  },

  // --- Contact Section ---
  contact: {
    mapIframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd",
  },
};

export default portfolioData;
