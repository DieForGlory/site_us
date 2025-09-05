import React from 'react'
import './News.css'

const News = () => {
  const news = [
    {
      id: 1,
      title: 'Новый жилой комплекс "Золотые холмы"',
      excerpt: 'Начинаем строительство нового премиального жилого комплекса в экологически чистом районе города.',
      date: '15 января 2024',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Проекты'
    },
    {
      id: 2,
      title: 'Использование экологичных материалов',
      excerpt: 'Мы внедряем новые технологии строительства с использованием экологически чистых материалов.',
      date: '10 января 2024',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Технологии'
    },
    {
      id: 3,
      title: 'Награда "Лучшая строительная компания 2023"',
      excerpt: 'Golden House получила престижную награду за качество строительства и клиентский сервис.',
      date: '5 января 2024',
      image: 'https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Награды'
    }
  ]

  return (
    <section className="news section" id="news">
      <div className="container">
        <div className="section-title">
          <h2>Новости компании</h2>
          <p>Следите за нашими последними достижениями и проектами</p>
        </div>

        <div className="news-grid">
          {news.map(article => (
            <article key={article.id} className="news-card card">
              <div className="news-image">
                <img src={article.image} alt={article.title} />
                <div className="news-category">{article.category}</div>
              </div>
              <div className="news-content">
                <div className="news-date">{article.date}</div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <a href="#" className="read-more">Читать далее →</a>
              </div>
            </article>
          ))}
        </div>

        <div className="news-cta">
          <a href="#" className="btn btn-secondary">Все новости</a>
        </div>
      </div>
    </section>
  )
}

export default News