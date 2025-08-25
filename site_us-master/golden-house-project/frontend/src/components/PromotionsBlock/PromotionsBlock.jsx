import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './PromotionsBlock.css';

const PromotionsBlock = () => {
    return (
        <section id="promotions" className="promo-section">
            <div className="promo-container-split">
                <motion.div
                    className="promo-content"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    <motion.h2 variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: {duration: 0.7} } }}>
                        Ваша квартира на лучших условиях
                    </motion.h2>
                    <motion.p variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: {duration: 0.7, delay: 0.2} } }}>
                        Откройте для себя эксклюзивные акции, скидки и специальные программы рассрочки от Golden House.
                    </motion.p>
                    <motion.div variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: {duration: 0.7, delay: 0.4} } }}>
                        <Link to="/promotions" className="promo-cta-button">
                            Узнать больше
                        </Link>
                    </motion.div>
                </motion.div>
                <div className="promo-image-side">
                    {/* Фоновое изображение будет задано через CSS */}
                </div>
            </div>
        </section>
    );
};

export default PromotionsBlock;