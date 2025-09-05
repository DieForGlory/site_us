@@ .. @@
 import React, { useState, useEffect, useRef } from 'react';
-import axios from 'axios';
 import { Link } from 'react-router-dom';
 import { motion, AnimatePresence } from 'framer-motion';
+import { projects as mockProjects } from '../../data/mockData';

 import { Swiper, SwiperSlide } from 'swiper/react';
@@ .. @@
 const Projects = () => {
-  const [projects, setProjects] = useState([]);
+  const [projects, setProjects] = useState(mockProjects);
   const [activeIndex, setActiveIndex] = useState(0);
   const sectionRef = useRef(null);
   const isWheeling = useRef(false);

@@ .. @@
   }, [projects.length, activeIndex]);

-  useEffect(() => {
-    axios.get('/api/projects')
-      .then(res => setProjects(res.data))
-      .catch(err => console.error("Ошибка:", err));
-  }, []);
-
   if (projects.length === 0) return null;