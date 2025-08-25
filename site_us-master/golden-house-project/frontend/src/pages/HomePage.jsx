import React from 'react';
import Hero from '../components/Hero/Hero';
import PromotionsBlock from '../components/PromotionsBlock/PromotionsBlock';
import Projects from '../components/Projects/Projects';
import Advantages from '../components/Advantages/Advantages';
import CompanyStats from '../components/CompanyStats/CompanyStats';
import News from '../components/News/News';
import Cta from '../components/Cta/Cta';

// Файл HomePage.css нам больше не нужен, можно его удалить
// import './HomePage.css';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <PromotionsBlock />
      <Projects />
      <Advantages />

      {/* Возвращаем компоненты как отдельные блоки */}
      <CompanyStats />
      <News />

      <Cta />
    </main>
  );
};

export default HomePage;