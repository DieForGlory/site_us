import React, { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h2>Golden House</h2>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Главная</a></li>
              <li><a href="#projects" onClick={() => setIsMenuOpen(false)}>Проекты</a></li>
              <li><a href="#about" onClick={() => setIsMenuOpen(false)}>О нас</a></li>
              <li><a href="#news" onClick={() => setIsMenuOpen(false)}>Новости</a></li>
              <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Контакты</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <a href="tel:+998901234567" className="phone-link">
              +998 90 123 45 67
            </a>
            <button className="menu-toggle" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header