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
            <div className="container">
                <Link to="/promotions" className="back-link">← Назад к акциям</Link>
                <div className="promotion-detail">
                    <img src={promotion.bg} alt={promotion.title} className="promotion-image" />
                    <div className="promotion-info">
                        <h1>{promotion.title}</h1>
                        <p className="promotion-description">{promotion.description}</p>
                        <div className="promotion-dates">
                            <p><strong>Действует до:</strong> {promotion.expires_on}</p>
                        </div>
                        <div className="promotion-content" dangerouslySetInnerHTML={{ __html: promotion.detailed_description }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePromotionPage;