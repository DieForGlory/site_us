import React from 'react';
import { motion } from 'framer-motion';
import './PromotionsPage.css'; // Подключаем стили

// Данные для страницы акций
const promotionsData = [
    {
        title: "Скидка 15% на квартиры в ЖК Infinity",
        description: "Только до конца лета! Успейте купить квартиру своей мечты с невероятной выгодой. Предложение распространяется на ограниченное количество 3- и 4-комнатных квартир.",
        bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070'
    },
    {
        title: "Рассрочка 0% на 3 года в Parkent Plaza",
        description: "Первоначальный взнос всего 30% и никаких переплат. Ваша новая квартира стала еще доступнее. Идеальное решение для тех, кто планирует будущее.",
        bg: 'https://images.unsplash.com/photo-1582463143926-a07c1b3a3c22?q=80&w=1932'
    },
    {
        title: "Дизайн-проект в подарок",
        description: "При покупке любой квартиры в ЖК Novza до конца осени, вы получаете эксклюзивный дизайн-проект от наших партнеров в подарок.",
        bg: 'https://images.unsplash.com/photo-1600573472591-ee6b68d34869?q=80&w=2070'
    }
];

const PromotionsPage = () => {
    return (
        <div className="promotions-page">
            <div className="promotions-header">
                <h1>Действующие акции</h1>
                <p>Самые выгодные предложения для покупки вашей новой квартиры</p>
            </div>
            <div className="promotions-list">
                {promotionsData.map((promo, index) => (
                    <motion.div
                        className="promo-card-full"
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, delay: index * 0.2 }}
                        style={{ backgroundImage: `url(${promo.bg})` }}
                    >
                        <div className="promo-card-overlay"></div>
                        <div className="promo-card-content">
                            <h2>{promo.title}</h2>
                            <p>{promo.description}</p>
                            <button className="promo-card-button">Получить консультацию</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PromotionsPage;