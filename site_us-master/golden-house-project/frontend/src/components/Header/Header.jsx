// frontend/src/components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// 1. Импортируем Link и useLocation
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const navItemVariants = {
  hover: { y: -3, transition: { duration: 0.2 } },
  tap: { y: 0, transition: { duration: 0.1 } }
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  // 2. Получаем информацию о текущем маршруте
  const location = useLocation();

  // 3. Определяем, является ли текущая страница страницей с "тёмным" фоном (главная)
  const isHomePage = location.pathname === '/';

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 4. Собираем классы для хедера:
  // - 'scrolled' добавляется при прокрутке
  // - 'light-theme' добавляется СРАЗУ, если это НЕ главная страница
  const headerClasses = `site-header ${scrolled ? 'scrolled' : ''} ${!isHomePage ? 'light-theme' : ''}`;

  return (
    <header className={headerClasses}>
      <div className="header-container">
        <Link to="/" className="logo">
          Golden House
        </Link>
        <nav className="main-nav">
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Link to="/#projects">Проекты</Link>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Link to="/promotions">Акции</Link>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Link to="/vacancies">Вакансии</Link>
          </motion.div>
          <motion.div variants={navItemVariants} whileHover="hover" whileTap="tap">
            <Link to="/service">Клиентский сервис</Link>
          </motion.div>
        </nav>
        <Link to="/#contacts" className="header-cta-button">
          Связаться
        </Link>
      </div>
    </header>
  );
};

export default Header;