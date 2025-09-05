import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/mockData';
import './SingleProjectPage.css';

const SingleProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  // Intersection Observer hooks for animations
  const [overviewRef, overviewInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [layoutsRef, layoutsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [stagesRef, stagesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [mapRef, mapInView] = useInView({ threshold: 0.1, triggerOnce: true });

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

  // Mock data for new sections
  const layouts = [
    {
      id: 1,
      type: "1-комнатная",
      area: "45 м²",
      price: "$120,000",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    },
    {
      id: 2,
      type: "2-комнатная",
      area: "65 м²", 
      price: "$180,000",
      image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"
    },
    {
      id: 3,
      type: "3-комнатная",
      area: "85 м²",
      price: "$250,000", 
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg"
    }
  ];

  const constructionStages = [
    {
      id: 1,
      title: "Подготовительные работы",
      date: "Январь 2024",
      status: "completed",
      content: "Получение разрешений, подготовка территории, геодезические работы"
    },
    {
      id: 2,
      title: "Фундамент и подземная часть",
      date: "Февраль - Апрель 2024",
      status: "completed",
      content: "Устройство фундамента, подземного паркинга и инженерных коммуникаций"
    },
    {
      id: 3,
      title: "Возведение каркаса",
      date: "Май - Сентябрь 2024",
      status: "in-progress",
      content: "Строительство несущих конструкций, монолитных работ до 15 этажа"
    },
    {
      id: 4,
      title: "Фасадные работы",
      date: "Октябрь 2024 - Март 2025",
      status: "planned",
      content: "Утепление фасада, облицовка, установка окон и витражей"
    },
    {
      id: 5,
      title: "Внутренние работы",
      date: "Апрель - Август 2025",
      status: "planned",
      content: "Инженерные системы, отделочные работы, благоустройство территории"
    },
    {
      id: 6,
      title: "Сдача объекта",
      date: "Сентябрь 2025",
      status: "planned",
      content: "Получение разрешения на ввод в эксплуатацию, передача ключей"
    }
  ];

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!project) {
    return <div className="error">Проект не найден</div>;
  }

  return (
    <div className="single-project-page">
      <div className="container">
        {/* Navigation Tabs */}
        <motion.div 
          className="project-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Обзор
          </button>
          <button 
            className={`tab-btn ${activeTab === 'layouts' ? 'active' : ''}`}
            onClick={() => setActiveTab('layouts')}
          >
            Планировки
          </button>
          <button 
            className={`tab-btn ${activeTab === 'stages' ? 'active' : ''}`}
            onClick={() => setActiveTab('stages')}
          >
            Этапы строительства
          </button>
          <button 
            className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            Карта
          </button>
        </motion.div>

        {/* Overview Section */}
        {activeTab === 'overview' && (
        <motion.div 
          className="project-detail"
          ref={overviewRef}
          initial={{ opacity: 0, y: 20 }}
          animate={overviewInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
        )}

        {/* Layouts Section */}
        {activeTab === 'layouts' && (
          <motion.div 
            className="layouts-section"
            ref={layoutsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={layoutsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Планировки квартир</h2>
            <div className="layouts-grid">
              {layouts.map((layout, index) => (
                <motion.div
                  key={layout.id}
                  className="layout-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={layoutsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <img src={layout.image} alt={layout.type} />
                  <div className="layout-info">
                    <h3>{layout.type}</h3>
                    <div className="layout-details">
                      <span className="area">{layout.area}</span>
                      <span className="price">{layout.price}</span>
                    </div>
                    <button className="btn btn-primary">Выбрать планировку</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Construction Stages Section */}
        {activeTab === 'stages' && (
          <motion.div 
            className="construction-stages-section"
            ref={stagesRef}
            initial={{ opacity: 0, y: 20 }}
            animate={stagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Этапы строительства</h2>
            <div className="stages-timeline">
              {constructionStages.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  className={`stage-item ${stage.status}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={stagesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="stage-marker">
                    <div className={`stage-icon ${stage.status}`}>
                      {stage.status === 'completed' && '✓'}
                      {stage.status === 'in-progress' && '⚡'}
                      {stage.status === 'planned' && '○'}
                    </div>
                  </div>
                  <div className="stage-content">
                    <div className="stage-header">
                      <h3>{stage.title}</h3>
                      <span className={`stage-status ${stage.status}`}>
                        {stage.status === 'completed' && 'Завершено'}
                        {stage.status === 'in-progress' && 'В процессе'}
                        {stage.status === 'planned' && 'Запланировано'}
                      </span>
                    </div>
                    <div className="stage-date">{stage.date}</div>
                    <p>{stage.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Map Section */}
        {activeTab === 'map' && (
          <motion.div 
            className="map-section"
            ref={mapRef}
            initial={{ opacity: 0, y: 20 }}
            animate={mapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Расположение на карте</h2>
            <div className="map-container">
              <div className="map-placeholder">
                <div className="map-icon">🗺️</div>
                <h3>Интерактивная карта</h3>
                <p>Здесь будет размещена интерактивная карта с расположением жилого комплекса</p>
                <div className="map-features">
                  <div className="feature-item">
                    <span className="icon">🏪</span>
                    <span>Магазины поблизости</span>
                  </div>
                  <div className="feature-item">
                    <span className="icon">🚇</span>
                    <span>Метро в 5 минутах</span>
                  </div>
                  <div className="feature-item">
                    <span className="icon">🏥</span>
                    <span>Медицинские центры</span>
                  </div>
                  <div className="feature-item">
                    <span className="icon">🎓</span>
                    <span>Школы и детские сады</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="location-info">
              <h3>Преимущества расположения</h3>
              <div className="advantages-grid">
                <div className="advantage-item">
                  <h4>Транспортная доступность</h4>
                  <p>Удобное расположение рядом с основными транспортными артериями города</p>
                </div>
                <div className="advantage-item">
                  <h4>Развитая инфраструктура</h4>
                  <p>В шаговой доступности магазины, рестораны, банки и другие объекты</p>
                </div>
                <div className="advantage-item">
                  <h4>Экологичность</h4>
                  <p>Близость к паркам и зеленым зонам для комфортного отдыха</p>
                </div>
                <div className="advantage-item">
                  <h4>Безопасность</h4>
                  <p>Спокойный район с низким уровнем преступности</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SingleProjectPage;