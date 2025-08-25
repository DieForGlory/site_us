import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5010/api/projects');
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p className="status-message">Загрузка проектов...</p>;
  if (projects.length === 0) return <p className="status-message">Проекты не найдены.</p>;

  return (
    <section id="projects" className="projects-section-zigzag">
      <div className="section-header">
        <h1>Наши проекты</h1>
        <p>Архитектура, создающая будущее</p>
      </div>
      <div className="projects-list-zigzag">
        {projects.map((project, index) => (
          <motion.div
            className={`project-row ${index % 2 !== 0 ? 'project-row-reverse' : ''}`}
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="project-row-image">
              <img src={project.main_image_url} alt={project.title} />
            </div>
            <div className="project-row-info">
              {project.discount_tag && (
                <span className="project-row-tag">{project.discount_tag}</span>
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Link to={`/projects/${project.id}`} className="project-row-button">
                Подробнее о проекте
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;