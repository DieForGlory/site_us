import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

import ProjectSidebar from '../components/ProjectSidebar/ProjectSidebar';
import ProjectGallery from '../components/ProjectGallery/ProjectGallery';
import ProjectMap from '../components/ProjectMap/ProjectMap';

import './SingleProjectPage.css';

const SingleProjectPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`/api/projects/${id}`);
                setProject(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке проекта:", error);
                setError("Не удалось загрузить информацию о проекте. Попробуйте позже.");
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) return <div className="loader">Загрузка...</div>;
    if (error) return <div className="loader">{error}</div>;
    if (!project) return <div className="loader">Проект не найден.</div>;

    return (
        <motion.div
            className="project-page-reimagined"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
        >
            <ProjectSidebar project={project} />

            <div className="project-scrollable-content">
                <div className="content-block hero-image" style={{ backgroundImage: `url(${project.main_image_url})` }}></div>

                <div className="content-block text-block">
                    <h2>О проекте</h2>
                    <p>{project.description}</p>
                    <p>Дополнительный абзац текста, описывающий философию и уникальные особенности жилого комплекса. Мы создаем не просто квадратные метры, а пространство для жизни, наполненное светом, воздухом и комфортом. Архитектура комплекса гармонично вписана в окружающий ландшафт, а продуманные планировки отвечают самым высоким требованиям.</p>
                </div>

                <ProjectGallery gallery={project.gallery} />
                <ProjectMap address={project.address} />
            </div>
        </motion.div>
    );
};

export default SingleProjectPage;