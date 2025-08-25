import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop'; // 1. Импортируем наш новый компонент
import HomePage from './pages/HomePage';
import SingleProjectPage from './pages/SingleProjectPage';
import PromotionsPage from './pages/PromotionsPage';

function App() {
  return (
    <>
      <Header />
      <ScrollToTop /> {/* 2. Добавляем его сюда */}
      <main> {/* Обернем роуты в <main> для семантики */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:id" element={<SingleProjectPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          {/* Здесь будут другие роуты */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;