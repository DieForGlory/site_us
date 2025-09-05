import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title fade-in-up">
              Строим дома <br />
              <span className="highlight">вашей мечты</span>
            </h1>
            <p className="hero-description fade-in-up">
              Более 15 лет опыта в строительстве элитной недвижимости. 
              Мы создаем не просто дома, а пространства для счастливой жизни.
            </p>
            <div className="hero-buttons fade-in-up">
              <a href="#projects" className="btn btn-primary">
                Наши проекты
              </a>
              <a href="#contact" className="btn btn-secondary">
                Получить консультацию
              </a>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Построенных домов</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15</div>
              <div className="stat-label">Лет опыта</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Довольных клиентов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero