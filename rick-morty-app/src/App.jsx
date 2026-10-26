import { useState } from 'react';
import useFetch from './hooks/useFetch';
import Buscador from './components/Buscador';
import PersonajeCard from './components/PersonajeCard';
import FavoritosModal from './components/FavoritosModal';
import { useFavoritosContext } from './context/FavoritosContext';

function App() {
  // 1. Estado local para el buscador
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. Estado local para abrir/cerrar el modal de favoritos
  const [modalAbierto, setModalAbierto] = useState(false);

  // 3. Traemos la cantidad de favoritos para mostrarla en el botón
  const { favoritos } = useFavoritosContext();

  // 4. Construimos la URL dinámica. Si searchTerm está vacío, trae todos.
  // Usamos la variable de entorno del .env
  const url = searchTerm 
    ? `${import.meta.env.VITE_API_URL}/character/?name=${searchTerm}`
    : `${import.meta.env.VITE_API_URL}/character`;

  // 5. Usamos nuestro hook
  const { data, loading, error } = useFetch(url);

  // 6. Handler para el input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-surface font-display pb-20">
      
      {/* --- HEADER / NAVBAR --- */}
      <header className="bg-white shadow-md dark:bg-gray-800 p-4 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Rick & Morty App</h1>
          <button
            onClick={() => setModalAbierto(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            Favoritos ❤️
            {favoritos.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {favoritos.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="max-w-6xl mx-auto px-4">
        <Buscador value={searchTerm} onChange={handleSearchChange} />

        {/* ESTADOS DE LA PETICIÓN */}
        {loading && (
          <p className="text-center text-xl font-bold mt-10">Buscando en el multiverso... ⏳</p>
        )}

        {error && (
          <div className="text-center mt-10">
            <p className="text-red-500 text-xl font-bold">{error} ❌</p>
            <p className="text-gray-500">Probá buscando otro nombre.</p>
          </div>
        )}

        {/* RENDERIZADO DE DATOS */}
        {data && !loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.results.map((personaje) => (
              <PersonajeCard key={personaje.id} personaje={personaje} />
            ))}
          </div>
        )}
      </main>

      {/* --- MODAL DE FAVORITOS --- */}
      <FavoritosModal 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
      />
    </div>
  );
}

export default App;