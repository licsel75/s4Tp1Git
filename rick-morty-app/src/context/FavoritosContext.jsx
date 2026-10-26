import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const FavoritosContext = createContext(null);

export function FavoritosProvider({ children }) {
  // Usamos useLocalStorage con una clave única para esta app
  const [favoritos, setFavoritos] = useLocalStorage('rick-morty:favoritos', []);

  // Función para agregar o quitar un personaje
  const toggleFavorito = (personaje) => {
    setFavoritos((prev) => {
      const yaEsta = prev.some((p) => p.id === personaje.id);
      
      return yaEsta
        ? prev.filter((p) => p.id !== personaje.id) // Si está, lo saco
        : [...prev, personaje];                     // Si no está, lo agrego
    });
  };

  // Función para saber si un personaje está en favoritos
  const esFavorito = (id) => favoritos.some((p) => p.id === id);

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, esFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritosContext() {
  const contexto = useContext(FavoritosContext);
  if (!contexto) {
    throw new Error('useFavoritosContext() debe usarse dentro de <FavoritosProvider>');
  }
  return contexto;
}