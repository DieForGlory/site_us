@@ .. @@
 import React, { useState, useEffect } from 'react';
-import axios from 'axios';
 import { motion } from 'framer-motion';
 import { Link } from 'react-router-dom';
+import { promotions as mockPromotions } from '../data/mockData';
 import './PromotionsPage.css';

 const PromotionsPage = () => {
-    const [promotions, setPromotions] = useState([]);
-    const [loading, setLoading] = useState(true);
-
-    useEffect(() => {
-        const fetchPromotions = async () => {
-            try {
-                const response = await axios.get('/api/promotions');
-                setPromotions(response.data);
-            } catch (error) {
-                console.error("Ошибка при загрузке акций:", error);
-            } finally {
-                setLoading(false);
-            }
-        };
-        fetchPromotions();
-    }, []);
+    const [promotions] = useState(mockPromotions);
+    const [loading] = useState(false);