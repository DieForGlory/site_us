// frontend/src/components/News/News.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './News.css';

const News = () => {
  // Убираем статичные данные и создаем состояние
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загружаем новости с бэкенда
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        if (Array.isArray(response.data)) {
          setNews(response.data);
        }
      } catch (error) {
        console.error("Ошибка при загрузке новостей:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Если новости еще грузятся или их нет, ничего не показываем
  if (loading || news.length < 3) {
    return null; // Или можно вернуть заглушку, например <p>Загрузка новостей...</p>
  }

  const featuredNews = news[0];
  const secondaryNews = news.slice(1);

  return (
    <section className="news-section-redesigned">
      <div className="news-container-redesigned">
        <div className="section-header">
          <h2>Новости со стройплощадки</h2>
          <p>Следите за ходом строительства наших проектов</p>
        </div>

        <motion.div
          className="news-grid-redesigned"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
        >
          {/* Главная новость */}
          <motion.div
            className="news-card-featured"
            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="news-card-image-wrapper">
              <div className="news-card-image" style={{backgroundImage: `url(${featuredNews.img})`}}></div>
            </div>
            <div className="news-card-content">
              <span className="news-card-date">{featuredNews.date}</span>
              <h3>{featuredNews.title}</h3>
              <p>{featuredNews.description}</p>
              <a href="#" className="news-card-link">Читать далее</a>
            </div>
          </motion.div>

          {/* Остальные новости */}
          <div className="news-grid-secondary">
            {secondaryNews.map((item, index) => (
              <motion.div
                className="news-card-secondary"
                key={index}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              >
                <div className="news-card-image-wrapper">
                  <div className="news-card-image" style={{backgroundImage: `url(${item.img})`}}></div>
                </div>
                <div className="news-card-content">
                  <span className="news-card-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <a href="#" className="news-card-link">Читать далее</a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default News;