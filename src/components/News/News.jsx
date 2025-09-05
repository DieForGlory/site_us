import React from 'react';
import { motion } from 'framer-motion';
import { news } from '../../data/mockData';
import './News.css';

const News = () => {
  const featuredNews = news[0];
  const secondaryNews = news.slice(1);

  return (
    <section className="news">
      <div className="container">
        <motion.h2 
          className="news__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Последние новости
        </motion.h2>
        
        <div className="news__grid">
          <motion.article 
            className="news__featured"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={featuredNews.image} alt={featuredNews.title} />
            <div className="news__content">
              <span className="news__date">{featuredNews.date}</span>
              <h3>{featuredNews.title}</h3>
              <p>{featuredNews.excerpt}</p>
            </div>
          </motion.article>
          
          <div className="news__secondary">
            {secondaryNews.map((item, index) => (
              <motion.article 
                key={item.id}
                className="news__item"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <img src={item.image} alt={item.title} />
                <div className="news__content">
                  <span className="news__date">{item.date}</span>
                  <h4>{item.title}</h4>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;