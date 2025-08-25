import React from 'react';
import './ProjectSidebar.css';

const ProjectSidebar = ({ project }) => {
    return (
        <div className="project-sticky-sidebar">
            <div className="sidebar-content">
                <h1>{project.title}</h1>
                <div className="project-stats">
                    <div className="stat-item"><span>Статус</span><p>{project.status}</p></div>
                    <div className="stat-item"><span>Класс</span><p>{project.class}</p></div>
                    <div className="stat-item"><span>Срок сдачи</span><p>{project.deadline}</p></div>
                    <div className="stat-item"><span>Этажность</span><p>{project.floors}</p></div>
                    <div className="stat-item"><span>Квартир</span><p>{project.apartments}</p></div>
                </div>
                <a href="#contacts" className="sidebar-cta-button">Получить консультацию</a>
            </div>
        </div>
    );
};

export default ProjectSidebar;