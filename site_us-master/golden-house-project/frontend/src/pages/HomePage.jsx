// frontend/src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero/Hero';
import PromotionsBlock from '../components/PromotionsBlock/PromotionsBlock';
import Projects from '../components/Projects/Projects';
import Advantages from '../components/Advantages/Advantages';
import CompanyStats from '../components/CompanyStats/CompanyStats';
import News from '../components/News/News';
import Cta from '../components/Cta/Cta';

const HomePage = () => {
  return (
    // Используем <>, чтобы вернуть все компоненты
    <>
      <Hero />
      <PromotionsBlock /> {/* <-- ВОТ ОН, ВОЗВРАЩАЕМ ЕГО */}
      <Projects />
      <Advantages />
      <CompanyStats />
      <News />
      <Cta />
    </>
  );
};

export default HomePage;