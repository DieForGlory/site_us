// frontend/src/components/Hero/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

// Импортируем иконку стрелки (можно скачать любую в формате SVG)
import scrollIcon from '../../assets/scroll-down.svg';

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section-reimagined">
      {/* Контейнер для фонового видео */}
      {/* <div className="video-background">
        {/* Можно использовать любое подходящее видео, например, с Vimeo или YouTube */}
        {/* <video autoPlay loop muted playsInline>
          <source
            src="https://player.vimeo.com/external/370467551.sd.mp4?s=346b03413d1a73602d4156641e8c79c1e75c5005&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
      </div> */}
      
      {/* Используем фоновое изображение вместо видео для лучшей производительности */}
      <div className="hero-background-image"></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content-wrapper">
        <motion.h1
          className="hero-title"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Архитектура, <br /> создающая будущее
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          Откройте для себя новый уровень жизни в проектах от Golden House.
          Современные технологии, премиальное качество и индивидуальный подход к каждому клиенту.
        </motion.p>
        
        <motion.div
          className="hero-cta-buttons"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          <button onClick={scrollToProjects} className="hero-btn hero-btn-primary">
            Смотреть проекты
          </button>
          <Link to="/#contacts" className="hero-btn hero-btn-secondary">
            Получить консультацию
          </Link>
        </motion.div>
      </div>
      
      <motion.div
        className="scroll-indicator"
        onClick={scrollToProjects}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 1, 
          delay: 1.2, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "easeInOut" 
        }}
      >
        <img src={scrollIcon} alt="Scroll Down" />
      </motion.div>
    </section>
  );
};

export default Hero;