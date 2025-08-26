// frontend/src/components/CompanyStats/CompanyStats.jsx
import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion'; // Импортируем motion
import './CompanyStats.css';

const stats = [
  { number: 12, text: 'лет успешной работы на рынке' },
  { number: 25, text: 'уникальных проектов сдано' },
  { number: 1500, text: 'счастливых семей обрели дом' },
  { number: 500, suffix: '+', text: 'профессионалов в команде' },
];

// Варианты для анимации контейнера
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

// Варианты для анимации каждого элемента
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const CompanyStats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Анимация начнется, когда 50% блока будет видно
  });

  return (
    <section className="stats-dynamic-section" ref={ref}>
      <div className="stats-dynamic-container">
        {/* Левая часть с заголовком */}
        <motion.div
          className="stats-intro"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2>Надежность, <br/> проверенная временем</h2>
          <p>Ключевые показатели, которые отражают наш опыт и масштаб.</p>
        </motion.div>

        {/* Правая часть со статистикой */}
        <motion.div
          className="stats-list"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div className="stat-item-dynamic" key={index} variants={itemVariants}>
              <span className="stat-number-dynamic">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2.5}
                    suffix={stat.suffix || ''}
                    enableScrollSpy
                  />
                )}
              </span>
              <p className="stat-text-dynamic">{stat.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyStats;