function Buscador({ value, onChange }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Buscar personaje por nombre..."
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
}

export default Buscador;