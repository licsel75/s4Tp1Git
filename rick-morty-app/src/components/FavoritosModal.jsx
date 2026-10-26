import { useFavoritosContext } from '../context/FavoritosContext';

function FavoritosModal({ isOpen, onClose }) {
  const { favoritos, toggleFavorito } = useFavoritosContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-xl dark:bg-gray-800">
        <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold dark:text-white">Mis Favoritos ({favoritos.length})</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-black dark:hover:text-white">×</button>
        </header>

        <div className="flex-grow overflow-y-auto p-4">
          {favoritos.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Todavía no guardaste ningún personaje.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {favoritos.map((p) => (
                <li key={p.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg dark:bg-gray-700">
                  <span className="font-semibold dark:text-white">{p.name}</span>
                  <button onClick={() => toggleFavorito(p)} className="text-red-500 hover:text-red-700">
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritosModal;