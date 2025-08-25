import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

// Данные для наших точек интереса
const hotspotsData = [
  {
    id: 1,
    title: 'Скидка 15% в ЖК Infinity',
    description: 'Только до конца лета на 3- и 4-комнатные квартиры.',
    position: { top: '45%', left: '20%' } // Позиция в процентах
  },
  {
    id: 2,
    title: 'Рассрочка 0%',
    description: 'В ЖК Parkent Plaza. Первый взнос от 30%.',
    position: { top: '65%', left: '75%' }
  }
];

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content-wrapper">
        <motion.div
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <h1 className="hero-title">
            Архитектура, создающая будущее
          </h1>
          <p className="hero-subtitle">
            Откройте для себя новый уровень жизни в проектах от Golden House.
          </p>
        </motion.div>
      </div>

      {/* ==== НОВЫЙ БЛОК: ТОЧКИ ИНТЕРЕСА ==== */}
      <div className="hotspots-container">
        {hotspotsData.map(spot => (
          <motion.div
            className="hotspot"
            key={spot.id}
            style={spot.position}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 1 + spot.id * 0.2 }}
          >
            <div className="hotspot-pulse"></div>
            <div className="hotspot-dot"></div>
            <div className="hotspot-tooltip">
              <h4>{spot.title}</h4>
              <p>{spot.description}</p>
              <Link to="/promotions" className="tooltip-link">Подробнее →</Link>
            </div>
          </motion.div>
        ))}
      </div>
      {/* ==================================== */}
    </section>
  );
};

export default Hero;