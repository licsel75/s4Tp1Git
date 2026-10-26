import { useFavoritosContext } from '../context/FavoritosContext';

function PersonajeCard({ personaje }) {
  const { esFavorito, toggleFavorito } = useFavoritosContext();
  const favorito = esFavorito(personaje.id);

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col dark:bg-gray-800">
      <img 
        src={personaje.image} 
        alt={`Imagen de ${personaje.name}`} 
        className="w-full h-64 object-cover"
      />
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text dark:text-white mb-1 truncate">
          {personaje.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {personaje.species} - {personaje.status}
        </p>

        <button
          type="button"
          onClick={() => toggleFavorito(personaje)}
          className={`mt-auto w-full py-2 rounded-lg font-bold transition-colors ${
            favorito 
              ? "bg-red-100 text-red-600 hover:bg-red-200" 
              : "bg-primary text-white hover:bg-blue-700"
          }`}
        >
          {favorito ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
        </button>
      </div>
    </article>
  );
}

export default PersonajeCard;