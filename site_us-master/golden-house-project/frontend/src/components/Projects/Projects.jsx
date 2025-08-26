// frontend/src/components/Projects/Projects.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './Projects.css';

// Кастомный компонент для навигации, чтобы связать его с текстом
const SwiperNavButtons = ({ activeIndex, totalSlides }) => {
  const swiper = useSwiper();
  return (
    <div className="project-nav-container">
      <div className="project-counter">
        <span className="current-slide">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="divider">/</span>
        <span className="total-slides">{String(totalSlides).padStart(2, '0')}</span>
      </div>
      <div className="nav-buttons">
        <button onClick={() => swiper.slidePrev()} className="swiper-button-prev-custom"></button>
        <button onClick={() => swiper.slideNext()} className="swiper-button-next-custom"></button>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5010/api/projects');
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchProjects();
  }, []);

  if (projects.length === 0) return null;

  const activeProject = projects[activeIndex];

  // Определяем варианты анимации для текста
  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    <div className="projects-fullscreen-section" id="projects">
      <div className="projects-background-image" style={{backgroundImage: `url(${activeProject?.main_image_url})`}}></div>
      <div className="projects-background-overlay"></div>

      <div className="projects-container">
        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          effect="fade" // Используем эффект растворения
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={800} // Увеличиваем скорость перехода
          className="projects-swiper-main"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              {/* Этот слайд теперь только для картинки, контент вынесен */}
              <div className="slide-image-container" style={{backgroundImage: `url(${project.main_image_url})`}}></div>
            </SwiperSlide>
          ))}

          {/* Контент вынесен из слайдера и анимируется отдельно */}
          <div className="project-content-area">
            {/* Оборачиваем текстовый блок в AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex} // Ключ меняется -> анимация запускается
                variants={textAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Добавляем motion к каждому элементу */}
                <motion.p variants={textAnimation} className="project-short-description">
                  {activeProject?.short_description}
                </motion.p>
                <motion.h2 variants={textAnimation} className="project-title">
                  {activeProject?.title}
                </motion.h2>
                <motion.div variants={textAnimation}>
                  <Link to={`/projects/${activeProject?.id}`} className="project-details-button">
                    Подробнее о проекте
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Навигация теперь тоже часть Swiper */}
          <SwiperNavButtons activeIndex={activeIndex} totalSlides={projects.length} />
        </Swiper>
      </div>
    </div>
  );
};

export default Projects;