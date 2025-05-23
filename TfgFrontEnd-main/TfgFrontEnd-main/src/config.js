// Configuración centralizada de la aplicación

// URL de la API
export const API_URL = '/api';

// URL del backend para imágenes y recursos
export const BACKEND_URL = 'http://127.0.0.1:8000';

// Configuración de timeout para peticiones (en ms)
export const API_TIMEOUT = 30000;

// Versión de la aplicación
export const APP_VERSION = '1.0.0';

// Entorno (development, production)
export const ENV = 'development';

// Función para construir URLs completas para imágenes
export const getImageUrl = (path) => {
  if (!path) return '/placeholder-house.jpg';
  if (path.startsWith('http')) return path;
  return `${BACKEND_URL}${path}`;
}; 