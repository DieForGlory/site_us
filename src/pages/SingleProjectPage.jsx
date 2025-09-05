@@ .. @@
 import React, { useState, useEffect } from 'react';
 import { useParams } from 'react-router-dom';
-import axios from 'axios';
 import { motion } from 'framer-motion';
+import { projects } from '../data/mockData';

 import ProjectSidebar from '../components/ProjectSidebar/ProjectSidebar';
@@ .. @@
     useEffect(() => {
-        const fetchProject = async () => {
-            try {
-                const response = await axios.get(`/api/projects/${id}`);
-                setProject(response.data);
-            } catch (error) {
-                console.error("Ошибка при загрузке проекта:", error);
-                setError("Не удалось загрузить информацию о проекте. Попробуйте позже.");
-            } finally {
-                setLoading(false);
-            }
-        };
-        fetchProject();
+        const foundProject = projects.find(p => p.id === parseInt(id));
+        if (foundProject) {
+            setProject(foundProject);
+        } else {
+            setError("Проект не найден.");
+        }
+        setLoading(false);
     }, [id]);

export default ProjectSidebar