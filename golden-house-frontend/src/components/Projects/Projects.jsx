import React, { useState } from 'react'
import './Projects.css'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'Элитный коттедж "Золотая долина"',
      category: 'cottage',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      area: '450 м²',
      price: 'от $350,000',
      location: 'Ташкент'
    },
    {
      id: 2,
      title: 'Современная вилла "Sunrise"',
      category: 'villa',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      area: '320 м²',
      price: 'от $280,000',
      location: 'Самарканд'
    },
    {
      id: 3,
      title: 'Таунхаус "Green Park"',
      category: 'townhouse',
      image: 'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=800',
      area: '180 м²',
      price: 'от $150,000',
      location: 'Бухара'
    },
    {
      id: 4,
      title: 'Загородный дом "Comfort"',
      category: 'cottage',
      image: 'https://images.pexels.com/photos/1396119/pexels-photo-1396119.jpeg?auto=compress&cs=tinysrgb&w=800',
      area: '280 м²',
      price: 'от $220,000',
      location: 'Ташкент'
    },
    {
      id: 5,
      title: 'Премиум вилла "Luxury"',
      category: 'villa',
      image: 'https://images.pexels.com/photos/1396117/pexels-photo-1396117.jpeg?auto=compress&cs=tinysrgb&w=800',
      area: '520 м²',
      price: 'от $450,000',
      location: 'Ташкент'
    },
    {
      id: 6,
      title: 'Семейный таунхаус "Family"',
      category: 'townhouse',
      image: 'https://images.pexels.com/photos/1396116/pexels-photo-1396116.jpeg?auto=compress&cs=tinysrgb&w=800',
      area: '220 м²',
      price: 'от $180,000',
      location: 'Самарканд'
    }
  ]

  const filters = [
    { key: 'all', label: 'Все проекты' },
    { key: 'cottage', label: 'Коттеджи' },
    { key: 'villa', label: 'Виллы' },
    { key: 'townhouse', label: 'Таунхаусы' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="section-title">
          <h2>Наши проекты</h2>
          <p>Каждый проект - это уникальное архитектурное решение</p>
        </div>

        <div className="project-filters">
          {filters.map(filter => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <button className="view-btn">Подробнее</button>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <div className="project-details">
                  <div className="detail">
                    <span className="label">Площадь:</span>
                    <span className="value">{project.area}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Цена:</span>
                    <span className="value price">{project.price}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Локация:</span>
                    <span className="value">{project.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <p>Не нашли подходящий проект?</p>
          <a href="#contact" className="btn btn-primary">
            Заказать индивидуальный проект
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects