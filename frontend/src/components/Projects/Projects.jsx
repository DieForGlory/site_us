import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { projects } from '../../data/mockData';
import './Projects.css';

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const containerElement = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerElement,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    setTimeout(() => {
      setProjectsData(projects);
      setLoading(false);
    }, 800);
  }, []);

  const filteredProjects = projectsData.filter(project => {
    if (filter === 'all') return true;
    return project.status?.toLowerCase() === filter;
  });

  const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });
    
    return (
      <motion.div
        ref={cardRef}
        className="project-card-3d"
        initial={{ opacity: 0, y: 100, rotateX: -15 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          transition: { 
            duration: 0.8, 
            delay: index * 0.2,
            type: "spring",
            stiffness: 100
          }
        } : {}}
        whileHover={{ 
          y: -20, 
          rotateY: 5,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        onHoverStart={() => setHoveredProject(project.id)}
        onHoverEnd={() => setHoveredProject(null)}
        onClick={() => setSelectedProject(project)}
      >
        <div className="card-inner">
          <div className="card-front">
            <div className="project-image-container">
              <motion.img 
                src={project.images?.[0]} 
                alt={project.title}
                className="project-image"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.div 
                className="image-overlay"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="overlay-content">
                  <motion.div
                    className="view-details-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Подробнее
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="status-badge-floating"
                animate={{ 
                  y: hoveredProject === project.id ? -10 : 0,
                  scale: hoveredProject === project.id ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <span className={`status-badge ${project.status?.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </motion.div>
            </div>
            
            <div className="project-content">
              <motion.h3
                className="project-title"
                animate={{ 
                  color: hoveredProject === project.id ? '#667eea' : '#1a202c'
                }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-stats">
                <motion.div 
                  className="stat-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="stat-label">Цена от</span>
                  <span className="stat-value">${project.price_from?.toLocaleString()}</span>
                </motion.div>
                <motion.div 
                  className="stat-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="stat-label">Локация</span>
                  <span className="stat-value">{project.location}</span>
                </motion.div>
              </div>
              
              <div className="project-features-preview">
                {project.features?.slice(0, 3).map((feature, idx) => (
                  <motion.span 
                    key={idx} 
                    className="feature-pill"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: '#667eea', color: 'white' }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </div>
              
              <motion.div 
                className="card-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link 
                  to={`/projects/${project.id}`} 
                  className="btn-primary-3d"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Подробнее
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <section className="projects-section-3d" ref={containerElement}>
        <motion.div 
          className="background-elements"
          style={{ y, opacity }}
        >
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </motion.div>
        <div className="container">
          <div className="loading-animation">
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Загружаем проекты...
            </motion.p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section-3d" ref={containerElement}>
      <motion.div 
        className="background-elements"
        style={{ y, opacity }}
      >
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </motion.div>
      
      <div className="container">
        <motion.div 
          className="section-header-3d"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="section-title-3d"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Наши проекты
          </motion.h2>
          <motion.p
            className="section-subtitle-3d"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Откройте для себя премиальную недвижимость будущего
          </motion.p>
        </motion.div>

        <motion.div 
          className="filter-tabs-3d"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {['all', 'в продаже', 'строится', 'сдан'].map((filterOption, index) => (
            <motion.button
              key={filterOption}
              className={`filter-btn-3d ${filter === filterOption ? 'active' : ''}`}
              onClick={() => setFilter(filterOption)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="btn-text">
                {filterOption === 'all' ? 'Все проекты' : 
                 filterOption === 'в продаже' ? 'В продаже' :
                 filterOption === 'строится' ? 'Строится' : 'Сданные'}
              </span>
              <div className="btn-bg"></div>
            </motion.button>
          ))}
        </motion.div>

        <div className="projects-grid-3d">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <motion.div 
            className="no-projects-3d"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="no-projects-icon"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏗️
            </motion.div>
            <p>Проекты по выбранному фильтру не найдены</p>
          </motion.div>
        )}
      </div>

      {/* Modal for project details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                ×
              </button>
              <div className="modal-content">
                <img src={selectedProject.images?.[0]} alt={selectedProject.title} />
                <div className="modal-info">
                  <h3>{selectedProject.title}</h3>
                  <p>{selectedProject.description}</p>
                  <Link 
                    to={`/projects/${selectedProject.id}`}
                    className="btn-primary-3d"
                    onClick={() => setSelectedProject(null)}
                  >
                    Подробнее
                  </Link>
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