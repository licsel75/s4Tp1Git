# Rick & Morty App - Consumo de API

## Qué es
Una aplicación web que consume la API pública de Rick and Morty para buscar personajes, ver sus detalles y guardar favoritos que persisten en el navegador.

## Demo
Netlify

## API Utilizada
- [Rick and Morty API](https://rickandmortyapi.com/documentation)

## Cómo correrlo
1. Clonar el repositorio.
2. Instalar dependencias: `pnpm install`
3. Renombrar el archivo `.env.example` a `.env` (o crear uno nuevo con `VITE_API_URL=https://rickandmortyapi.com/api`).
4. Correr el servidor: `pnpm run dev`

## Decisiones y Uso de IA
- **Custom Hooks:** Creé `useFetch` para manejar el ciclo completo de la petición (loading, error, data) y así reutilizar la lógica en cualquier endpoint. Reutilicé `useLocalStorage` del Sprint 3 para la persistencia de los favoritos.
- **Manejo de Errores:** Usé el bloque `try/catch/finally` en el hook. Si la búsqueda no arroja resultados (error 404 de la API), el usuario ve un mensaje amigable en pantalla.
- **IA:** Usé IA para [contar acá qué usaste, ej: "para entender cómo construir la URL dinámica" o "para repasar la sintaxis del fetch"].