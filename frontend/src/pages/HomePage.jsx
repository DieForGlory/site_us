import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Projects from '../components/Projects/Projects';
import { news, promotions } from '../data/mockData';
import './HomePage.css';

const HomePage = () => {
  const [statsRef, statsInView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const stats = [
    {
      id: 1,
      number: 15,
      label: "Завершенных проектов",
      suffix: "+",
      icon: "🏗️",
      description: "Качественных жилых комплексов сдано в эксплуатацию"
    },
    {
      id: 2,
      number: 2500,
      label: "Довольных клиентов",
      suffix: "+",
      icon: "👥",
      description: "Семей обрели свой дом мечты с нашей помощью"
    },
    {
      id: 3,
      number: 12,
      label: "Лет на рынке",
      suffix: "",
      icon: "⭐",
      description: "Опыта в сфере недвижимости и строительства"
    },
    {
      id: 4,
      number: 98,
      label: "Процент довольных клиентов",
      suffix: "%",
      icon: "💎",
      description: "Клиентов рекомендуют нас своим друзьям и знакомым"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Golden House</h1>
            <p>Премиальная недвижимость для комфортной жизни</p>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary">Наши проекты</Link>
              <Link to="/promotions" className="btn btn-secondary">Акции</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Company Statistics */}
      <section className="stats-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="stats-header-content">
              <span className="stats-badge">Наши достижения</span>
              <h2>Golden House в цифрах</h2>
              <p>Более 12 лет мы создаем комфортное жилье и строим доверительные отношения с клиентами</p>
            </div>
          </motion.div>

          <motion.div 
            className="stats-grid"
            ref={statsRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="stat-icon">
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    {statsInView && (
                      <CountUp
                        start={0}
                        end={stat.number}
                        duration={2.5}
                        separator=","
                      />
                    )}
                    <span className="stat-suffix">{stat.suffix}</span>
                  </div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="stats-footer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="stats-cta">
              <h3>Присоединяйтесь к нашим довольным клиентам</h3>
              <p>Станьте частью большой семьи Golden House</p>
              <button className="btn btn-primary stats-btn">
                <span>🏠</span>
                Выбрать квартиру
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="promotions-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Акции и скидки</h2>
            <p>Выгодные предложения для покупки недвижимости</p>
          </motion.div>

          <div className="promotions-grid">
            {promotions.slice(0, 3).map((promotion, index) => (
              <motion.div
                key={promotion.id}
                className="promotion-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="promotion-image">
                  <img src={promotion.bg} alt={promotion.title} />
                  <div className="promotion-badge">
                    <span>До {promotion.expires_on}</span>
                  </div>
                </div>
                <div className="promotion-content">
                  <h3>{promotion.title}</h3>
                  <p>{promotion.description}</p>
                  <Link to={`/promotions/${promotion.id}`} className="btn btn-primary">
                    Подробнее
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="promotions-footer">
            <Link to="/promotions" className="btn btn-secondary">
              Все акции
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Новости</h2>
            <p>Последние новости и события Golden House</p>
          </motion.div>

          <div className="news-grid">
            {news.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.id}
                className="news-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={item.image} alt={item.title} />
                <div className="news-content">
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <div className="news-footer">
                    <span className="news-date">{new Date(item.date).toLocaleDateString('ru-RU')}</span>
                    <Link to={`/news/${item.id}`} className="news-link">
                      Читать далее →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="news-section-footer">
            <Link to="/news" className="btn btn-secondary">
              Все новости
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;