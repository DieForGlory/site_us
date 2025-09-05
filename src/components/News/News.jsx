@@ .. @@
 import React from 'react';
 import { motion } from 'framer-motion';
-import axios from 'axios';
+import { news } from '../../data/mockData';
 import './News.css';

 const News = () => {
-  // Убираем статичные данные и создаем состояние
-  const [news, setNews] = useState([]);
-  const [loading, setLoading] = useState(true);
-
-  // Загружаем новости с бэкенда
-  useEffect(() => {
-    const fetchNews = async () => {
-      try {
-        const response = await axios.get('/api/news');
-        if (Array.isArray(response.data)) {
-          setNews(response.data);
-        }
-      } catch (error) {
-        console.error("Ошибка при загрузке новостей:", error);
-      } finally {
-        setLoading(false);
-      }
-    };
-    fetchNews();
-  }, []);
-
-  // Если новости еще грузятся или их нет, ничего не показываем
-  if (loading || news.length < 3) {
-    return null; // Или можно вернуть заглушку, например <p>Загрузка новостей...</p>
-  }
-
   const featuredNews = news[0];
   const secondaryNews = news.slice(1);