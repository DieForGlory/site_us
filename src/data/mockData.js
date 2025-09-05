// Моковые данные для фронтенда
export const projects = [
  {
    id: 1,
    title: "Жилой комплекс Golden Valley",
    short_description: "Премиальный жилой комплекс в центре города",
    description: "Современный жилой комплекс Golden Valley предлагает квартиры премиум-класса с панорамными видами на город. Комплекс оснащен всей необходимой инфраструктурой для комфортной жизни.",
    main_image_url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    discount_tag: "Скидка 15%",
    status: "Строится",
    class: "Премиум",
    deadline: "IV квартал 2024",
    floors: 25,
    apartments: 200,
    address: "г. Ташкент, ул. Амира Темура, 15",
    gallery: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=800"
    ]
  },
  {
    id: 2,
    title: "Элитный комплекс Sunrise Residence",
    short_description: "Элитное жилье с видом на горы",
    description: "Sunrise Residence - это воплощение роскоши и комфорта. Каждая квартира спроектирована с учетом современных стандартов качества жизни.",
    main_image_url: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
    discount_tag: null,
    status: "Готов",
    class: "Элит",
    deadline: "Сдан",
    floors: 18,
    apartments: 120,
    address: "г. Ташкент, ул. Шахрисабз, 42",
    gallery: [
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1396119/pexels-photo-1396119.jpeg?auto=compress&cs=tinysrgb&w=800"
    ]
  },
  {
    id: 3,
    title: "Современный комплекс City Park",
    short_description: "Жилье бизнес-класса в зеленой зоне",
    description: "City Park сочетает в себе городской комфорт и близость к природе. Идеальное место для семейной жизни.",
    main_image_url: "https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=800",
    discount_tag: "Рассрочка 0%",
    status: "Строится",
    class: "Бизнес",
    deadline: "II квартал 2025",
    floors: 12,
    apartments: 150,
    address: "г. Ташкент, ул. Бабура, 28",
    gallery: [
      "https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1396117/pexels-photo-1396117.jpeg?auto=compress&cs=tinysrgb&w=800"
    ]
  }
];

export const news = [
  {
    id: 1,
    title: "Начало строительства Golden Valley",
    description: "Мы рады сообщить о начале строительства нашего нового премиального жилого комплекса Golden Valley. Проект будет реализован с использованием самых современных технологий.",
    date: "15 декабря 2023",
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    title: "Получена награда 'Лучший застройщик года'",
    description: "Golden House удостоена престижной награды 'Лучший застройщик года' за высокое качество строительства и инновационные решения.",
    date: "10 декабря 2023",
    img: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    title: "Новые технологии в строительстве",
    description: "Мы внедряем революционные технологии 'умного дома' во всех наших новых проектах, обеспечивая максимальный комфорт для жильцов.",
    date: "5 декабря 2023",
    img: "https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

export const promotions = [
  {
    id: 1,
    title: "Новогодняя акция - скидка до 20%",
    description: "Специальное предложение на квартиры в Golden Valley. Успейте воспользоваться выгодными условиями!",
    detailed_description: "<h2>Новогодняя акция</h2><p>Мы рады предложить вам уникальную возможность приобрести квартиру в нашем премиальном жилом комплексе Golden Valley со скидкой до 20%!</p><h3>Условия акции:</h3><ul><li>Скидка до 20% на все квартиры</li><li>Рассрочка на 24 месяца без процентов</li><li>Бесплатная парковка в подарок</li></ul><p>Акция действует до 31 января 2024 года.</p>",
    bg: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
    expires_on: "31 января 2024"
  },
  {
    id: 2,
    title: "Рассрочка 0% на 36 месяцев",
    description: "Беспроцентная рассрочка на все квартиры в комплексе City Park. Без переплат и скрытых комиссий.",
    detailed_description: "<h2>Беспроцентная рассрочка</h2><p>Приобретите квартиру мечты в City Park с рассрочкой 0% на 36 месяцев!</p><h3>Преимущества:</h3><ul><li>Без процентов и переплат</li><li>Гибкий график платежей</li><li>Возможность досрочного погашения</li></ul>",
    bg: "https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=800",
    expires_on: "28 февраля 2024"
  }
];