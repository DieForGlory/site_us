import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/mockData';
import './Projects.css';

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const projectsRef = useRef(null);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setProjectsData(projects);
      setLoading(false);
    }, 500);
  }, []);

  const filteredProjects = projectsData.filter(project => {
    if (filter === 'all') return true;
    return project.status?.toLowerCase() === filter;
  });

  const loadMore = () => {
    setVisibleProjects(prev => prev + 6);
  };

  if (loading) {
    return (
      <section className="projects-section">
        <div className="container">
          <div className="loading">Загрузка проектов...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section" ref={projectsRef}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Наши проекты</h2>
          <p>Откройте для себя премиальную недвижимость Golden House</p>
        </motion.div>

        <motion.div 
          className="filter-tabs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Все проекты
          </button>
          <button 
            className={`filter-btn ${filter === 'в продаже' ? 'active' : ''}`}
            onClick={() => setFilter('в продаже')}
          >
            В продаже
          </button>
          <button 
            className={`filter-btn ${filter === 'строится' ? 'active' : ''}`}
            onClick={() => setFilter('строится')}
          >
            Строится
          </button>
          <button 
            className={`filter-btn ${filter === 'сдан' ? 'active' : ''}`}
            onClick={() => setFilter('сдан')}
          >
            Сданные
          </button>
        </motion.div>

        <div className="projects-grid">
          <AnimatePresence>
            {filteredProjects.slice(0, visibleProjects).map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <img 
                    src={project.images?.[0] || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg'} 
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="project-status">
                    <span className={`status-badge ${project.status?.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-details">
                    <div className="detail">
                      <span className="label">Цена от:</span>
                      <span className="value">${project.price_from?.toLocaleString()}</span>
                    </div>
                    <div className="detail">
                      <span className="label">Локация:</span>
                      <span className="value">{project.location}</span>
                    </div>
                    <div className="detail">
                      <span className="label">Срок сдачи:</span>
                      <span className="value">
                        {new Date(project.completion_date).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>

                  {project.features && project.features.length > 0 && (
                    <div className="project-features">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="feature-tag">{feature}</span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="feature-tag more">+{project.features.length - 3}</span>
                      )}
                    </div>
                  )}

                  <div className="project-actions">
                    <Link to={`/projects/${project.id}`} className="btn btn-primary">
                      Подробнее
                    </Link>
                    <button className="btn btn-secondary">Консультация</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length > visibleProjects && (
          <motion.div 
            className="load-more-container"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button className="btn btn-secondary load-more-btn" onClick={loadMore}>
              Показать еще проекты
            </button>
          </motion.div>
        )}

        {filteredProjects.length === 0 && (
          <motion.div 
            className="no-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p>Проекты по выбранному фильтру не найдены</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;