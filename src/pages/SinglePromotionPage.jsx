@@ .. @@
 import React, { useState, useEffect } from 'react';
 import { useParams, Link } from 'react-router-dom';
-import axios from 'axios';
+import { promotions } from '../data/mockData';
 import './SinglePromotionPage.css';

 const SinglePromotionPage = () => {
@@ .. @@
     useEffect(() => {
-        const fetchPromotion = async () => {
-            try {
-                const response = await axios.get(`/api/promotions/${id}`);
-                setPromotion(response.data);
-            } catch (error) {
-                console.error("Ошибка при загрузке акции:", error);
-            } finally {
-                setLoading(false);
-            }
-        };
-        fetchPromotion();
+        const foundPromotion = promotions.find(p => p.id === parseInt(id));
+        if (foundPromotion) {
+            setPromotion(foundPromotion);
+        }
+        setLoading(false);
     }, [id]);