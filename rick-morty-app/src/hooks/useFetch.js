import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no hay URL, no hacemos nada
    if (!url) return;

    // Función asíncrona interna para la petición
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);

        // fetch no tira error en un 404, lo tenemos que forzar nosotros
        if (!response.ok) {
          throw new Error('No se encontraron resultados. Probá con otra búsqueda.');
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false); // Pase lo que pase, apagamos el spinner
      }
    };

    fetchData();
  }, [url]); // Se vuelve a ejecutar cada vez que cambia la URL

  return { data, loading, error };
}

export default useFetch;