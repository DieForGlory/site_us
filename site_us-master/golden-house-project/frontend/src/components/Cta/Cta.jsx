// frontend/src/components/Cta/Cta.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Cta.css'; // <-- ИСПРАВЛЕНИЕ ЗДЕСЬ

const Cta = () => {
  return (
    <section id="contacts" className="cta-section-reimagined">
      <div className="cta-container-reimagined">
        <motion.div
          className="cta-info-side"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2>Остались вопросы?</h2>
          <p>
            Свяжитесь с нами любым удобным способом или оставьте заявку,
            и наши лучшие специалисты ответят вам в ближайшее время.
          </p>
          <div className="contact-details">
            <p><strong>Адрес:</strong> г. Ташкент, ул. Тараса Шевченко, 21А</p>
            <p><strong>Телефон:</strong> +998 71 202 22 22</p>
            <p><strong>Email:</strong> info@goldenhouse.uz</p>
          </div>
        </motion.div>

        <motion.div
          className="cta-form-side"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <form className="cta-form-reimagined">
            <div className="form-group">
              <label htmlFor="name">Ваше имя</label>
              <input type="text" id="name" placeholder="Как к вам обращаться?" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Номер телефона</label>
              <input type="tel" id="phone" placeholder="+998 XX XXX-XX-XX" />
            </div>
            <button type="submit">Отправить</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;