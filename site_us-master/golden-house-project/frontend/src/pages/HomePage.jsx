// frontend/src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';
import Advantages from '../components/Advantages/Advantages';
import CompanyStats from '../components/CompanyStats/CompanyStats';
import Cta from '../components/Cta/Cta';
import News from '../components/News/News';

// 1. Снова импортируем стили для главной страницы
import './HomePage.css';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Projects />

      {/* 2. ДОБАВЛЯЕМ НОВЫЙ ПЕРЕХОДНЫЙ БЛОК */}
      <section className="transition-section">
        <div className="transition-content">
          <h2>
            Мы строим не просто стены. <br />
            Мы создаем пространства для жизни, где рождаются истории.
          </h2>
        </div>
      </section>
      {/* КОНЕЦ НОВОГО БЛОКА */}

      <Advantages />
      <CompanyStats />
      <News />
      <Cta />
    </>
  );
};

export default HomePage;