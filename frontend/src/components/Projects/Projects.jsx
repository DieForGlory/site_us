import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Autoplay, Mousewheel } from 'swiper/modules';
import { projects } from '../../data/mockData';
import './Projects.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProjectsData(projects);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProjects = projectsData.filter(project => {
    if (filter === 'all') return true;
    return project.status?.toLowerCase() === filter;
  });

  const filterOptions = [
    { key: 'all', label: 'Все проекты' },
    { key: 'в продаже', label: 'В продаже' },
    { key: 'строится', label: 'Строится' },
    { key: 'сдан', label: 'Сданные' }
  ];

  if (loading) {
    return (
      <section className="projects-section">
        <div className="container">
          <div className="loading-container">
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.h3
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Загружаем проекты...
            </motion.h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Наши проекты</h2>
          <p>Листайте и изучайте наши премиальные проекты</p>
        </motion.div>

        <motion.div 
          className="filter-tabs"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filterOptions.map((option, index) => (
            <motion.button
              key={option.key}
              className={`filter-btn ${filter === option.key ? 'active' : ''}`}
              onClick={() => setFilter(option.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {option.label}
            </motion.button>
          ))}
        </motion.div>

        {filteredProjects.length > 0 ? (
          <div className="projects-carousel">
            <Swiper
              modules={[Pagination, EffectCoverflow, Autoplay, Mousewheel]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              mousewheel={{
                enabled: true,
                sensitivity: 1,
                thresholdDelta: 50,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="projects-swiper"
            >
              {filteredProjects.map((project, index) => (
                <SwiperSlide key={project.id} className="project-slide">
                  <motion.div
                    className="project-card-3d"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="card-header">
                      <div className="project-location">
                        <span className="location-icon">📍</span>
                        {project.location}
                      </div>
                      <div className={`project-status ${project.status?.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </div>
                    </div>
                    
                    <div className="project-image-wrapper">
                      <img 
                        src={project.images?.[0]} 
                        alt={project.title}
                        className="project-image"
                      />
                      <div className="image-overlay">
                        <div className="overlay-content">
                          <div className="price-badge">
                            <span className="price-from">от</span>
                            <span className="price-value">${project.price_from?.toLocaleString()}</span>
                          </div>
                          <button className="view-details-btn">
                            <span>Подробнее</span>
                            <span className="arrow">→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-content">
                      <div className="project-header">
                        <h3 className="project-title">{project.title}</h3>
                        <div className="completion-date">
                          <span className="date-icon">🗓️</span>
                          <span>{new Date(project.completion_date).toLocaleDateString('ru-RU')}</span>
                        </div>
                      </div>
                      
                      <p className="project-description">{project.description}</p>
                      
                      <div className="project-highlights">
                        {project.features?.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="highlight-item">
                            <span className="highlight-dot"></span>
                            <span className="highlight-text">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="card-footer">
                        <div className="project-stats">
                          <div className="stat-item">
                            <span className="stat-icon">🏠</span>
                            <span className="stat-text">Квартиры от 1 до 4 комн.</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-icon">🚗</span>
                            <span className="stat-text">Подземный паркинг</span>
                          </div>
                        </div>
                        
                        <Link 
                          to={`/projects/${project.id}`} 
                          className="card-action-btn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Узнать больше</span>
                          <span className="btn-icon">📋</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Project Counter */}
            <div className="project-counter">
              <span className="current">{activeIndex + 1}</span>
              <span className="separator">/</span>
              <span className="total">{filteredProjects.length}</span>
            </div>

            {/* Navigation Hints */}
            <div className="navigation-hints">
              <div className="hint">
                <span className="hint-icon">🖱️</span>
                <span className="hint-text">Скролл для переключения проектов</span>
              </div>
              <div className="hint">
                <span className="hint-icon">👆</span>
                <span className="hint-text">Клик для быстрого просмотра</span>
              </div>
              <div className="hint">
                <span className="hint-icon">📱</span>
                <span className="hint-text">Свайп на мобильных</span>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            className="no-projects"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="no-projects-icon">🏗️</div>
            <h3>Проекты не найдены</h3>
            <p>По выбранному фильтру проекты не найдены</p>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
              
              <div className="modal-image">
                <img src={selectedProject.images?.[0]} alt={selectedProject.title} />
                <div className={`modal-status ${selectedProject.status?.toLowerCase().replace(' ', '-')}`}>
                  {selectedProject.status}
                </div>
              </div>
              
              <div className="modal-info">
                <h3>{selectedProject.title}</h3>
                <p className="modal-description">{selectedProject.description}</p>
                
                <div className="modal-stats">
                  <div className="modal-stat">
                    <span className="modal-stat-label">Цена от</span>
                    <span className="modal-stat-value">${selectedProject.price_from?.toLocaleString()}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="modal-stat-label">Локация</span>
                    <span className="modal-stat-value">{selectedProject.location}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="modal-stat-label">Срок сдачи</span>
                    <span className="modal-stat-value">
                      {new Date(selectedProject.completion_date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>

                <div className="modal-features">
                  <h4>Особенности:</h4>
                  <div className="modal-features-list">
                    {selectedProject.features?.map((feature, idx) => (
                      <span key={idx} className="modal-feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-actions">
                  <Link 
                    to={`/projects/${selectedProject.id}`}
                    className="btn btn-primary modal-btn"
                    onClick={() => setSelectedProject(null)}
                  >
                    Полная информация
                  </Link>
                  <button 
                    className="btn btn-secondary modal-btn"
                    onClick={() => setSelectedProject(null)}
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;