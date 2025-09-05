import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h2>Golden House</h2>
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Главная</Link></li>
              <li><Link to="/projects" onClick={() => setIsMenuOpen(false)}>Проекты</Link></li>
              <li><Link to="/promotions" onClick={() => setIsMenuOpen(false)}>Акции</Link></li>
              <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>О нас</Link></li>
              <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Контакты</Link></li>
            </ul>
          </nav>

          <button 
            className={`menu-toggle ${isMenuOpen ? 'menu-toggle-open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;