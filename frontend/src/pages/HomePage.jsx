import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Projects from '../components/Projects/Projects';
import { news } from '../data/mockData';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Golden House</h1>
            <p>Премиальная недвижимость для комфортной жизни</p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">Наши проекты</Link>
              <Link to="/promotions" className="btn btn-secondary">Акции</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <Projects />

      {/* News Section */}
      <section className="news-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Новости</h2>
            <p>Последние новости и события Golden House</p>
          </motion.div>

          <div className="news-grid">
            {news.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                className="news-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <img src={item.image} alt={item.title} />
                <div className="news-content">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <span className="news-date">{new Date(item.date).toLocaleDateString('ru-RU')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;