import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Сначала проверяем, есть ли якорь в URL
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        // Если элемент с таким ID найден, плавно скроллим к нему
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return; // Прерываем выполнение, чтобы не скроллить наверх
      }
    }

    // Если якоря нет, просто скроллим страницу наверх
    window.scrollTo(0, 0);

  }, [pathname, hash]); // Эффект срабатывает при смене пути или якоря

  return null;
}

export default ScrollToTop;