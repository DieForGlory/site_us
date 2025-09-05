import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { promotions } from '../data/mockData';
import './SinglePromotionPage.css';

const SinglePromotionPage = () => {
    const { id } = useParams();
    const [promotion, setPromotion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const foundPromotion = promotions.find(p => p.id === parseInt(id));
        if (foundPromotion) {
            setPromotion(foundPromotion);
        }
        setLoading(false);
    }, [id]);

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (!promotion) {
        return <div className="error">Акция не найдена</div>;
    }

    return (
        <div className="single-promotion-page">
            <Link to="/promotions" className="back-link">← Назад к акциям</Link>
            <div className="promotion-detail">
                <img src={promotion.image} alt={promotion.title} className="promotion-image" />
                <div className="promotion-info">
                    <h1>{promotion.title}</h1>
                    <p className="promotion-description">{promotion.description}</p>
                    <div className="promotion-dates">
                        <p><strong>Период действия:</strong> {promotion.startDate} - {promotion.endDate}</p>
                    </div>
                    <div className="promotion-discount">
                        <span className="discount-badge">Скидка {promotion.discount}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePromotionPage;