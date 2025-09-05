import React from 'react'
import './CompanyStats.css'

const CompanyStats = () => {
  const stats = [
    {
      number: '150+',
      label: 'Построенных домов',
      icon: '🏠'
    },
    {
      number: '15',
      label: 'Лет опыта',
      icon: '⭐'
    },
    {
      number: '98%',
      label: 'Довольных клиентов',
      icon: '😊'
    },
    {
      number: '24/7',
      label: 'Поддержка клиентов',
      icon: '📞'
    }
  ]

  return (
    <section className="company-stats section">
      <div className="stats-background"></div>
      <div className="container">
        <div className="section-title">
          <h2 style={{ color: 'white' }}>Наши достижения</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Цифры, которые говорят о нашем профессионализме
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyStats