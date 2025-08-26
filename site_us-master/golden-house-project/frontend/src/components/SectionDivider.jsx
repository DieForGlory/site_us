import React from 'react';
import './SectionDivider.css';

const SectionDivider = () => (
  <div className="section-divider">
    <div className="divider-line"></div>
    {/* Можно добавить иконку или логотип в центре */}
    <div className="divider-icon">◆</div>
    <div className="divider-line"></div>
  </div>
);

export default SectionDivider;