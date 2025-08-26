// frontend/src/components/Projects/Projects.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, EffectCreative } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-creative';

import './Projects.css';

// Внутренний компонент галереи для правой колонки
const ProjectGallery = ({ project }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    // Если у проекта нет галереи, показываем заглушку
    if (!project.gallery || project.gallery.length === 0) {
        return (
            <div className="project-gallery-container placeholder">
                <div className="gallery-main-image" style={{ backgroundImage: `url(${project.main_image_url})` }}></div>
                <div className="placeholder-text">Галерея в процессе наполнения</div>
            </div>
        );
    }

    return (
        <div className="project-gallery-container">
            <Swiper
                modules={[Navigation, Thumbs, EffectCreative]}
                loop={true}
                speed={1000}
                effect={'creative'}
                creativeEffect={{
                    prev: { shadow: true, translate: ['-20%', 0, -1] },
                    next: { translate: ['100%', 0, 0] },
                }}
                navigation={{
                    nextEl: '.gallery-button-next',
                    prevEl: '.gallery-button-prev',
                }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="main-gallery-swiper"
            >
                {project.gallery.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="gallery-main-image" style={{ backgroundImage: `url(${image})` }}></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="thumbs-container">
                <Swiper
                    modules={[Thumbs]}
                    onSwiper={setThumbsSwiper}
                    slidesPerView={4}
                    spaceBetween={10}
                    watchSlidesProgress={true}
                    className="thumbs-gallery-swiper"
                >
                    {project.gallery.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="gallery-thumb-image" style={{ backgroundImage: `url(${image})` }}></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="gallery-nav">
                    <div className="gallery-button-prev"></div>
                    <div className="gallery-button-next"></div>
                </div>
            </div>
        </div>
    );
};


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isWheeling = useRef(false);

  useEffect(() => {
    const handleWheel = (e) => {
      const isScrollingDown = e.deltaY > 5;
      const isScrollingUp = e.deltaY < -5;
      const isLastSlide = activeIndex === projects.length - 1;
      const isFirstSlide = activeIndex === 0;

      if ((isLastSlide && isScrollingDown) || (isFirstSlide && isScrollingUp)) return;

      e.preventDefault();
      if (isWheeling.current) return;
      isWheeling.current = true;

      if (isScrollingDown) setActiveIndex((prev) => (prev + 1) % projects.length);
      else if (isScrollingUp) setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

      setTimeout(() => { isWheeling.current = false; }, 1200);
    };

    const projectsSection = sectionRef.current;
    if (projectsSection) projectsSection.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      if (projectsSection) projectsSection.removeEventListener('wheel', handleWheel);
    };
  }, [projects.length, activeIndex]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5010/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error("Ошибка:", err));
  }, []);

  if (projects.length === 0) return null;

  const activeProject = projects[activeIndex];

  return (
    <section ref={sectionRef} className="projects-vertical-section" id="projects">
      <div className="projects-layout-grid">
        <div className="projects-list-column">
          <div className="section-subtitle">Наши Проекты</div>
          <ul>
            {projects.map((project, index) => (
              <li key={project.id} className={index === activeIndex ? 'active' : ''} onClick={() => setActiveIndex(index)}>
                {project.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="project-display-column">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="project-content-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="project-title-new">{activeProject.title}</h2>
              <div className="project-details-layout">
                <div className="project-text-content-new">
                  <p className="project-full-description">{activeProject.description}</p>
                  <Link to={`/projects/${activeProject.id}`} className="project-details-button-new">
                    Исследовать проект
                  </Link>
                </div>
                <ProjectGallery project={activeProject} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;