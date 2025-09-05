import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3>Golden House</h3>
              <p>Строим дома вашей мечты с 2009 года</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">📱</a>
              <a href="#" className="social-link">📺</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Услуги</h4>
            <ul>
              <li><a href="#">Строительство коттеджей</a></li>
              <li><a href="#">Строительство вилл</a></li>
              <li><a href="#">Таунхаусы</a></li>
              <li><a href="#">Ремонт и реконструкция</a></li>
              <li><a href="#">Дизайн интерьера</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Компания</h4>
            <ul>
              <li><a href="#">О нас</a></li>
              <li><a href="#">Наши проекты</a></li>
              <li><a href="#">Отзывы клиентов</a></li>
              <li><a href="#">Карьера</a></li>
              <li><a href="#">Новости</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Контакты</h4>
            <div className="contact-info">
              <p>📍 г. Ташкент, ул. Строительная, 123</p>
              <p>📞 +998 90 123 45 67</p>
              <p>📧 info@goldenhouse.uz</p>
              <p>🕒 Пн-Пт: 9:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Golden House. Все права защищены.</p>
            <div className="footer-links">
              <a href="#">Политика конфиденциальности</a>
              <a href="#">Условия использования</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer