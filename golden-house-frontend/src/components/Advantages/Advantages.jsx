import React from 'react'
import './Advantages.css'

const Advantages = () => {
  const advantages = [
    {
      title: 'Качественные материалы',
      description: 'Используем только проверенные материалы от ведущих производителей',
      icon: '🏗️'
    },
    {
      title: 'Опытная команда',
      description: 'Наши специалисты имеют более 15 лет опыта в строительстве',
      icon: '👷'
    },
    {
      title: 'Соблюдение сроков',
      description: 'Гарантируем выполнение работ в установленные сроки',
      icon: '⏰'
    },
    {
      title: 'Гарантия качества',
      description: 'Предоставляем 5-летнюю гарантию на все виды работ',
      icon: '✅'
    },
    {
      title: 'Индивидуальный подход',
      description: 'Каждый проект разрабатывается с учетом ваших пожеланий',
      icon: '🎨'
    },
    {
      title: 'Полный цикл услуг',
      description: 'От проектирования до сдачи объекта под ключ',
      icon: '🔄'
    }
  ]

  return (
    <section className="advantages section">
      <div className="container">
        <div className="section-title">
          <h2>Наши преимущества</h2>
          <p>Почему клиенты выбирают именно нас</p>
        </div>

        <div className="advantages-grid">
          {advantages.map((advantage, index) => (
            <div key={index} className="advantage-card card">
              <div className="advantage-icon">{advantage.icon}</div>
              <h3>{advantage.title}</h3>
              <p>{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Advantages