// frontend/src/components/PromotionsBlock/PromotionsBlock.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './PromotionsBlock.css';

const PromotionsBlock = () => {
    return (
        // ID promotions теперь на самой секции
        <section id="promotions" className="promo-section-reimagined">
            <div className="promo-background-image"></div>
            <div className="promo-overlay"></div>
            <div className="promo-content-reimagined">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="promo-title">Ваша квартира на лучших условиях</h2>
                    <p className="promo-subtitle">
                        Откройте для себя эксклюзивные акции, скидки и специальные программы рассрочки от Golden House.
                    </p>
                    <Link to="/promotions" className="promo-cta-button-reimagined">
                        Смотреть все акции
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default PromotionsBlock;