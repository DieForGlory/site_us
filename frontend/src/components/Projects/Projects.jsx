import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/mockData';
import './Projects.css';

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

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
          <p>Премиальная недвижимость для комфортной жизни</p>
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

        <div className="projects-grid">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image-wrapper">
                  <img 
                    src={project.images?.[0]} 
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-overlay">
                    <motion.button
                      className="view-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Подробнее
                    </motion.button>
                  </div>
                  <div className={`status-badge ${project.status?.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </div>
                </div>
                
                <div className="project-info">
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
                  </div>
                  
                  <div className="project-features">
                    {project.features?.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    to={`/projects/${project.id}`} 
                    className="btn btn-primary project-btn"
                  >
                    Узнать больше
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
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
              </div>
              
              <div className="modal-info">
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
                
                <div className="modal-stats">
                  <div className="stat">
                    <span className="stat-label">Цена от</span>
                    <span className="stat-value">${selectedProject.price_from?.toLocaleString()}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Статус</span>
                    <span className="stat-value">{selectedProject.status}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Локация</span>
                    <span className="stat-value">{selectedProject.location}</span>
                  </div>
                </div>
                
                <Link 
                  to={`/projects/${selectedProject.id}`}
                  className="btn btn-primary modal-btn"
                  onClick={() => setSelectedProject(null)}
                >
                  Подробная информация
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;