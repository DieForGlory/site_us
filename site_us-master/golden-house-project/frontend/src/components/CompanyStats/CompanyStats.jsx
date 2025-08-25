import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './CompanyStats.css';

const stats = [
  { number: 12, text: 'лет на рынке' },
  { number: 25, text: 'сданных проектов' },
  { number: 1500, text: 'счастливых семей' },
  { number: 500, suffix: '+', text: 'сотрудников' },
];

const CompanyStats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="stats-section-reimagined" ref={ref}>
      <div className="stats-container-reimagined">
        <div className="stats-intro-text">
          <h2>Надежность, проверенная временем</h2>
        </div>
        <div className="stats-grid-reimagined">
          {stats.map((stat, index) => (
            <div className="stat-item-reimagined" key={index}>
              <span className="stat-number">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={2.5}
                    suffix={stat.suffix || ''}
                  />
                )}
              </span>
              <p className="stat-text">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyStats;