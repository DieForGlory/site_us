import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Advantages.css';

// Данные вынесены в массив для чистоты кода
const advantagesData = [
  {
    icon: '🏆',
    title: 'Лидер рынка',
    description: 'Более 10 лет создаем знаковые проекты, которые определяют архитектурный облик современного Ташкента.',
    img: 'https://images.unsplash.com/photo-1605283134159-8d53f5b7216a?q=80&w=2070'
  },
  {
    icon: '📍',
    title: 'Уникальные локации',
    description: 'Наши комплексы расположены в самых престижных и удобных для жизни районах, с развитой инфраструктурой и парками.',
    img: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=1974'
  },
  {
    icon: '🌿',
    title: 'Инновации и комфорт',
    description: 'Мы применяем передовые технологии в строительстве и продумываем каждую деталь для создания идеальной среды для жизни.',
    img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070'
  },
  {
    icon: '🔑',
    title: 'Гарантия и надежность',
    description: 'Строгое соблюдение сроков, использование только качественных материалов и полная прозрачность на всех этапах строительства.',
    img: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2070'
  },
];

const Advantages = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAdvantage = advantagesData[activeIndex];
  const intervalRef = useRef(null);

  useEffect(() => {
    // Запускаем таймер, который меняет activeIndex каждые 4 секунды
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % advantagesData.length);
    }, 4000); // 4000 миллисекунд = 4 секунды

    // Функция очистки для предотвращения утечек памяти
    return () => clearInterval(intervalRef.current);
  }, []); // Пустой массив зависимостей, чтобы эффект запустился один раз

  // Функция для ручного выбора (останавливает таймер)
  const handleItemClick = (index) => {
    clearInterval(intervalRef.current);
    setActiveIndex(index);
  };

  return (
    <section className="advantages-interactive-section">
      <div className="advantages-interactive-container">
        <div className="advantages-list">
          <h2>Почему Golden House</h2>
          <ul>
            {advantagesData.map((item, index) => (
              <motion.li
                key={index}
                className={index === activeIndex ? 'active' : ''}
                onClick={() => handleItemClick(index)}
                whileHover={{ x: 5 }}
              >
                <span className="advantage-list-icon">{item.icon}</span>
                {item.title}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="advantage-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="advantage-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ backgroundImage: `url(${activeAdvantage.img})` }}
            >
              <div className="advantage-image-overlay"></div>
            </motion.div>
          </AnimatePresence>
          <div className="advantage-text-content">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {activeAdvantage.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Невидимый блок для предзагрузки изображений */}
      <div style={{ display: 'none' }}>
        {advantagesData.map(item => (
          <img key={`preload-${item.title}`} src={item.img} alt="Preload" />
        ))}
      </div>
    </section>
  );
};

export default Advantages;