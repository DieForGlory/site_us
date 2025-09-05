import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { promotions as mockPromotions } from '../data/mockData';
import './PromotionsPage.css';

const PromotionsPage = () => {
    const [promotions] = useState(mockPromotions);
    const [loading] = useState(false);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="promotions-page">
            <h1>Акции и предложения</h1>
            <div className="promotions-grid">
                {promotions.map((promotion) => (
                    <motion.div
                        key={promotion.id}
                        className="promotion-card"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img src={promotion.image} alt={promotion.title} />
                        <div className="promotion-content">
                            <h3>{promotion.title}</h3>
                            <p>{promotion.description}</p>
                            <div className="promotion-details">
                                <span className="discount">{promotion.discount}</span>
                                <span className="valid-until">До {promotion.validUntil}</span>
                            </div>
                            <Link to={`/promotions/${promotion.id}`} className="btn-primary">
                                Подробнее
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PromotionsPage;