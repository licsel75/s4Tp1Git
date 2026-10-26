// Importo el hook useState para manejar los estados locales de esta vista
import { useState } from 'react';
// Importo mi custom hook que se encarga de hacer el fetch y manejar los estados de carga y error
import useFetch from './hooks/useFetch';
// Importo los componentes visuales que separé en la carpeta components
import Buscador from './components/Buscador';
import PersonajeCard from './components/PersonajeCard';
import FavoritosModal from './components/FavoritosModal';
// Importo mi contexto global para leer los favoritos y mostrarlos en el contador
import { useFavoritosContext } from './context/FavoritosContext';

function App() {
  // 1. CREO EL ESTADO DEL BUSCADOR
  // Arranca vacío. Cada vez que el usuario escribe, este estado se actualiza.
  const [searchTerm, setSearchTerm] = useState('');
  
  // 2. CREO EL ESTADO DEL MODAL DE FAVORITOS
  // Arranca en false (cerrado). Lo uso para mostrar u ocultar el modal.
  const [modalAbierto, setModalAbierto] = useState(false);

  // 3. AGREGO UN NUEVO ESTADO PARA LA PÁGINA (EL BONUS)
  // Arranca en la página 1. Lo uso para que la API me devuelva los siguientes 20 personajes.
  const [page, setPage] = useState(1);

  // 4. CONSUMO EL CONTEXTO DE FAVORITOS
  // Traigo la lista de favoritos para poder pintar el contador rojo en el header.
  const { favoritos } = useFavoritosContext();

  // 5. CONSTRUYO LA URL DINÁMICA (MODIFICADO CON EL PAGINADO)
  // Si hay texto en el buscador, armo la URL con el nombre Y la página actual.
  // Si no hay texto, armo la URL solo con la página actual.
  // Uso mi variable de entorno VITE_API_URL para no hardcodear la URL base.
  const url = searchTerm 
    ? `${import.meta.env.VITE_API_URL}/character/?name=${searchTerm}&page=${page}`
    : `${import.meta.env.VITE_API_URL}/character?page=${page}`;

  // 6. USO MI CUSTOM HOOK useFetch
  // Le paso la URL. El hook hace la petición y me devuelve los datos, el estado de carga y el error.
  // Como el useEffect de adentro depende de [url], cada vez que cambio de página o busco algo nuevo, la petición se dispara de nuevo automáticamente.
  const { data, loading, error } = useFetch(url);

  // 7. MODIFICO EL HANDLER DEL BUSCADOR
  // Cuando el usuario escribe, actualizo el estado Y reseteo la página a 1.
  // ¿Por qué? Porque si estoy en la página 4 y busco "Rick", la búsqueda puede tener solo 1 página y me tiraría error. Reseteando me aseguro de empezar siempre desde el principio.
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
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
            {/* Renderizado condicional: solo muestro el globito rojo si hay al menos 1 favorito */}
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
        {/* Le paso el estado y la función para actualizarlo al componente Buscador (es un input controlado) */}
        <Buscador value={searchTerm} onChange={handleSearchChange} />

        {/* ESTADOS DE LA PETICIÓN (Renderizado condicional) */}
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
          <> {/* Uso un Fragment para envolver la grilla y los botones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Recorro el array de personajes que viene de la API y creo una tarjeta por cada uno */}
              {data.results.map((personaje) => (
                <PersonajeCard key={personaje.id} personaje={personaje} />
              ))}
            </div>

            {/* 👇 AGREGO LOS BOTONES DE PAGINACIÓN 👇 */}
            <div className="flex justify-center items-center gap-4 mt-10 mb-6">
              <button
                onClick={() => setPage(page - 1)}
                // La API me devuelve 'data.info.prev'. Si es null (estoy en la pág 1), el botón se deshabilita.
                disabled={!data.info.prev}
                className="bg-primary text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                ← Anterior
              </button>
              
              {/* Muestro la página actual y el total de páginas que me devuelve la API */}
              <span className="font-bold text-text dark:text-white">
                Página {page} de {data.info.pages}
              </span>
              
              <button
                onClick={() => setPage(page + 1)}
                // Si 'data.info.next' es null (estoy en la última pág), el botón se deshabilita.
                disabled={!data.info.next}
                className="bg-primary text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Siguiente →
              </button>
            </div>
          </>
        )}
      </main>

      {/* --- MODAL DE FAVORITOS --- */}
      {/* Le paso el estado y la función para cerrar el modal */}
      <FavoritosModal 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
      />
    </div>
  );
}

export default App;