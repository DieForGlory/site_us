import React from 'react';
import { motion } from 'framer-motion';
import './News.css';

const newsData = [
  {
    img: 'https://placehold.co/600x400/333/FFF/png?text=Infinity',
    date: '20 Августа 2025',
    title: 'ЖК Infinity: завершение монолитных работ',
    description: 'Мы рады сообщить, что монолитные работы на объекте Infinity полностью завершены. Приступаем к фасаду.'
  },
  {
    // Вот исправленная ссылка
    img: 'https://placehold.co/600x400/555/FFF/png?text=Parkent+Plaza',
    date: '05 Августа 2025',
    title: 'Parkent Plaza: началось остекление',
    description: 'Начался один из самых красивых этапов — установка панорамных окон в комплексе Parkent Plaza.'
  },
  {
    img: 'https://placehold.co/600x400/777/FFF/png?text=OASIS',
    date: '15 Июля 2025',
    title: 'Старт продаж в новом ЖК "OASIS"',
    description: 'Объявляем о старте продаж квартир в нашем новом флагманском проекте в сердце города.'
  }
];

const News = () => {
  return (
    <section className="news-section">
      <div className="news-container">
        <div className="section-header">
          <h2>Новости со стройплощадки</h2>
          <p>Следите за ходом строительства наших проектов</p>
        </div>
        <div className="news-grid">
          {newsData.map((item, index) => (
            <motion.div
              className="news-card"
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="news-card-image">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="news-card-content">
                <span className="news-card-date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a href="#" className="news-card-link">Читать далее →</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;