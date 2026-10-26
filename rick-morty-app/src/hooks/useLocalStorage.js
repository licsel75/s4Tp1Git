import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error(`Error al leer localStorage (${key}):`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error al guardar en localStorage (${key}):`, error);
    }
  }, [key, value]);

  const removeFromStorage = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error al borrar localStorage (${key}):`, error);
    }
  };

  return [value, setValue, removeFromStorage];
}

export default useLocalStorage;