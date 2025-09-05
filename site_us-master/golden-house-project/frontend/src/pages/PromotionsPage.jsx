// frontend/src/pages/PromotionsPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './PromotionsPage.css';

const PromotionsPage = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get('/api/promotions');
                setPromotions(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке акций:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPromotions();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="promotions-page-container">
            <header className="promotions-page-header">
                <nav className="breadcrumbs">
                    <Link to="/">Главная</Link> / <span>Акции</span>
                </nav>
                <h1>Действующие акции</h1>
                <p>Самые выгодные предложения для покупки вашей новой квартиры.</p>
            </header>

            {loading ? (
                <div className="status-info">Загрузка акций...</div>
            ) : promotions.length === 0 ? (
                <div className="status-info">Действующих акций не найдено.</div>
            ) : (
                <motion.div
                    className="promotions-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {promotions.map((promo) => (
                        <motion.div className="promo-card-new" key={promo.id} variants={itemVariants}>
                            <div className="promo-card-image" style={{ backgroundImage: `url(${promo.bg})` }}>
                                {promo.expires_on && <div className="promo-card-expiry">до {promo.expires_on}</div>}
                            </div>
                            <div className="promo-card-content-new">
                                <h3>{promo.title}</h3>
                                <p>{promo.description}</p>
                                <Link to={`/promotions/${promo.id}`} className="promo-card-cta">
                                    Узнать подробнее
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default PromotionsPage;