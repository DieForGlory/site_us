import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Golden House</h3>
            <p>Премиальная недвижимость для комфортной жизни</p>
          </div>
          
          <div className="footer-section">
            <h4>Навигация</h4>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/projects">Проекты</Link></li>
              <li><Link to="/promotions">Акции</Link></li>
              <li><Link to="/about">О нас</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Контакты</h4>
            <p>+7 (123) 456-78-90</p>
            <p>info@goldenhouse.uz</p>
            <p>г. Ташкент, ул. Примерная, 123</p>
          </div>
          
          <div className="footer-section">
            <h4>Социальные сети</h4>
            <div className="social-links">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Telegram">TG</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Golden House. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;