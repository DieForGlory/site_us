import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/mockData';
import './SingleProjectPage.css';

const SingleProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === parseInt(id));
    if (foundProject) {
      setProject(foundProject);
    }
    setLoading(false);
  }, [id]);

  const nextImage = () => {
    if (project && project.images) {
      setCurrentImageIndex((prev) => 
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project && project.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!project) {
    return <div className="error">Проект не найден</div>;
  }

  return (
    <div className="single-project-page">
      <div className="container">
        <motion.div 
          className="project-detail"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="project-gallery">
            {project.images && project.images.length > 0 && (
              <div className="gallery-container">
                <img 
                  src={project.images[currentImageIndex]} 
                  alt={project.title}
                  className="main-image"
                />
                {project.images.length > 1 && (
                  <>
                    <button className="gallery-btn prev" onClick={prevImage}>‹</button>
                    <button className="gallery-btn next" onClick={nextImage}>›</button>
                    <div className="gallery-dots">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="project-info">
            <h1>{project.title}</h1>
            <p className="project-description">{project.description}</p>
            
            <div className="project-details">
              <div className="detail-item">
                <strong>Цена от:</strong> ${project.price_from?.toLocaleString()}
              </div>
              <div className="detail-item">
                <strong>Локация:</strong> {project.location}
              </div>
              <div className="detail-item">
                <strong>Статус:</strong> 
                <span className={`status ${project.status?.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
              <div className="detail-item">
                <strong>Срок сдачи:</strong> {new Date(project.completion_date).toLocaleDateString('ru-RU')}
              </div>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="project-features">
                <h3>Особенности:</h3>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="project-content">
              <p>{project.detailed_description}</p>
            </div>

            <div className="project-actions">
              <button className="btn btn-primary">Записаться на просмотр</button>
              <button className="btn btn-secondary">Получить консультацию</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleProjectPage;