// frontend/src/pages/SinglePromotionPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './SinglePromotionPage.css'; // Стили для этой страницы

const SinglePromotionPage = () => {
    const { id } = useParams();
    const [promotion, setPromotion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromotion = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5010/api/promotions/${id}`);
                setPromotion(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке акции:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPromotion();
    }, [id]);

    if (loading) return <div className="status-container">Загрузка...</div>;
    if (!promotion) return <div className="status-container">Акция не найдена.</div>;

    return (
        <div className="single-promo-container">
            <header className="single-promo-header" style={{ backgroundImage: `url(${promotion.bg})` }}>
                <div className="single-promo-overlay"></div>
                <div className="single-promo-header-content">
                    <nav className="breadcrumbs">
                        <Link to="/">Главная</Link> / <Link to="/promotions">Акции</Link> / <span>{promotion.title}</span>
                    </nav>
                    <h1>{promotion.title}</h1>
                    {promotion.expires_on && <p className="expiry-date">Действует до {promotion.expires_on}</p>}
                </div>
            </header>
            <main className="single-promo-content">
                {/* Отображаем детальное описание из админки */}
                <div dangerouslySetInnerHTML={{ __html: promotion.detailed_description }} />
                 <Link to="/#contacts" className="promo-details-cta">Оставить заявку</Link>
            </main>
        </div>
    );
};

export default SinglePromotionPage;