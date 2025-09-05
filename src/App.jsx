import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import SingleProjectPage from './pages/SingleProjectPage';
import PromotionsPage from './pages/PromotionsPage';
import SinglePromotionPage from './pages/SinglePromotionPage';

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:id" element={<SingleProjectPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/promotions/:id" element={<SinglePromotionPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;