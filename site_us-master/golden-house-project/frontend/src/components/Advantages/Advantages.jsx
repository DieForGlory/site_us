// frontend/src/components/Advantages/Advantages.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Advantages.css';

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
    description: 'Наши комплексы расположены в самых престижных и удобных для жизни районах.',
    img: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=1974'
  },
  {
    icon: '🌿',
    title: 'Инновации и комфорт',
    description: 'Мы применяем передовые технологии для создания идеальной среды для жизни.',
    img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070'
  }
];

// В компонент AdvantageCard не вносим изменений
const AdvantageCard = ({ advantage, progress, range }) => {
    // --- ИЗМЕНЕНИЕ ЛОГИКИ АНИМАЦИИ ---
    // Создаем более резкий переход:
    // Элемент полностью прозрачен -> быстро появляется -> виден -> быстро исчезает -> полностью прозрачен
    const opacity = useTransform(progress,
        [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
        [0, 1, 1, 0]
    );
    const y = useTransform(progress,
        [range[0], range[0] + 0.05],
        [50, 0] // Только анимация появления
    );

    return (
        <motion.div style={{ opacity, y }} className="advantage-card-content">
            <span className="advantage-icon">{advantage.icon}</span>
            <h2>{advantage.title}</h2>
            <p>{advantage.description}</p>
        </motion.div>
    );
};

// В основной компонент Advantages не вносим изменений в структуру, только в AdvantageCard выше
const Advantages = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <div ref={containerRef} className="advantages-scrolly-container">
            <div className="advantages-sticky-wrapper">
                {advantagesData.map((advantage, i) => {
                    const targetScale = 1 - ((advantagesData.length - i) * 0.05);
                    return (
                        <motion.div
                            key={i}
                            className="advantage-card-visual"
                            style={{
                                backgroundImage: `url(${advantage.img})`,
                                scale: useTransform(scrollYProgress, [i / advantagesData.length, 1], [1, targetScale])
                            }}
                        >
                           <div className="advantage-card-overlay"></div>
                        </motion.div>
                    );
                })}
                 <div className="advantage-text-container">
                    {advantagesData.map((advantage, i) => {
                        const start = i / advantagesData.length;
                        const end = start + (1 / advantagesData.length);
                        return <AdvantageCard key={i} advantage={advantage} progress={scrollYProgress} range={[start, end]} />
                    })}
                </div>
            </div>
        </div>
    );
};

export default Advantages;