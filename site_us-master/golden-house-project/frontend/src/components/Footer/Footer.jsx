import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-column">
          <div className="footer-logo">Golden House</div>
          <p className="footer-motto">Строим будущее с 2012 года.</p>
        </div>
        <div className="footer-column">
          <h4>Навигация</h4>
          <a href="/projects">Проекты</a>
          <a href="/promotions">Акции</a>
          <a href="/vacancies">Вакансии</a>
          <a href="/service">Клиентский сервис</a>
        </div>
        <div className="footer-column">
          <h4>Контакты</h4>
          <p>г. Ташкент, ул. Тараса Шевченко, 21А</p>
          <p>+998 71 202 22 22</p>
          <p>info@goldenhouse.uz</p>
        </div>
        <div className="footer-column">
          <h4>Мы в соцсетях</h4>
          <div className="social-links">
            <a href="#">FB</a>
            <a href="#">IN</a>
            <a href="#">TG</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Golden House. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;