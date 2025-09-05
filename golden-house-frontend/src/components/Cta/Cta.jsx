import React, { useState } from 'react'
import './Cta.css'

const Cta = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData)
    alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.')
    setFormData({ name: '', phone: '', email: '', message: '' })
  }

  return (
    <section className="cta section" id="contact">
      <div className="container">
        <div className="cta-content">
          <div className="cta-text">
            <h2>Готовы начать строительство?</h2>
            <p>
              Свяжитесь с нами для получения бесплатной консультации. 
              Наши специалисты помогут воплотить ваши мечты в реальность.
            </p>
            
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Телефон</h4>
                  <p>+998 90 123 45 67</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <p>info@goldenhouse.uz</p>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Адрес</h4>
                  <p>г. Ташкент, ул. Строительная, 123</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-form">
            <form onSubmit={handleSubmit} className="contact-form">
              <h3>Получить консультацию</h3>
              
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Номер телефона"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email адрес"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Расскажите о вашем проекте"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta