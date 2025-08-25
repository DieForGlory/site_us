import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// 1. Убедитесь, что Link импортируется из 'react-router-dom'
import { Link } from 'react-router-dom';
import './Header.css';

const navItemVariants = {
  hover: {
    y: -3,
    transition: { duration: 0.2 }
  },
  tap: {
    y: 0,
    transition: { duration: 0.1 }
  }
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={scrolled ? "site-header scrolled" : "site-header"}>
      <div className="header-container">
        {/* 2. Используем Link для логотипа */}
        <Link to="/" className="logo">
          Golden House
        </Link>
        <nav className="main-nav">
          {/* 3. Каждая ссылка в навигации - это Link */}
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Link to="/#projects">Проекты</Link>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Link to="/#promotions">Акции</Link>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Link to="/vacancies">Вакансии</Link>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Link to="/service">Клиентский сервис</Link>
          </motion.div>
        </nav>
        {/* 4. Кнопка "Связаться" также является Link */}
        <Link to="/#contacts" className="header-cta-button">
          Связаться
        </Link>
      </div>
    </header>
  );
};

export default Header;