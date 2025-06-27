// src/components/Blog.jsx
import React from 'react';

const Blog = ({ blogData }) => {
  return (
    <article className="
      blog bg-eerie-black-2 border border-jet rounded-2xl p-4 shadow-1 z-10
      md:w-[520px] md:mx-auto md:p-8
      lg:w-[950px] lg:p-8 lg:shadow-5 lg:min-h-full
    ">
      <header>
        <h2 className="h2 article-title relative text-white-2 text-2xl font-semibold capitalize pb-2 mb-4 md:text-4xl md:pb-4">
          Blog
          <span className="absolute bottom-0 left-0 w-8 h-1 bg-gradient-to-r from-orange-yellow-crayola to-orange-yellow-crayola rounded-sm md:w-10 md:h-[5px]"></span>
        </h2>
      </header>

      <section className="blog-posts mb-4">
        <ul className="blog-posts-list grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-8">
          {blogData.posts.map((post, index) => (
            <li key={index} className="blog-post-item">
              <a href={post.link} className="
                relative bg-gradient-to-br from-jet via-onyx to-jet h-full
                shadow-4 rounded-2xl z-10 block
                hover:shadow-2 transition-shadow duration-250
              ">
                <div className="absolute inset-px rounded-inherit bg-eerie-black-1 -z-10"></div>
                <figure className="blog-banner-box w-full h-[200px] rounded-xl overflow-hidden lg:h-[230px]">
                  <img
                    src={post.img}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-250 hover:scale-110"
                  />
                </figure>
                <div className="blog-content p-4 md:p-6">
                  <div className="blog-meta flex justify-start items-center gap-2 mb-2">
                    <p className="blog-category text-light-gray-70 text-sm font-light">{post.category}</p>
                    <span className="dot bg-light-gray-70 w-1 h-1 rounded-full"></span>
                    <time dateTime={post.date.replace(/ /g, '-') || ''} className="text-light-gray-70 text-sm font-light">{post.date}</time>
                  </div>
                  <h3 className="h3 blog-item-title text-white-2 text-lg font-medium leading-tight mb-2 transition-colors duration-250 hover:text-orange-yellow-crayola">
                    {post.title}
                  </h3>
                  <p className="blog-text text-light-gray text-base font-light leading-relaxed">
                    {post.text}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Blog;
