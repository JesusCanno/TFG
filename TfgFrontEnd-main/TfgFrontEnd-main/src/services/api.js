import axios from 'axios';
import { API_URL, API_TIMEOUT } from '../config';

// Verificar que estamos en ambiente de navegador
const isBrowser = typeof window !== 'undefined';

// Mostrar mensaje de depuración inicial
console.log('==== CONFIGURACIÓN API ====');
console.log('URL API:', API_URL);
console.log('Timeout:', API_TIMEOUT);

// Configuración base de Axios para conexión con Laravel
const api = axios.create({
  // URL base para la API de Laravel
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // Permitir cookies entre dominios (importante para autenticación)
  withCredentials: true,
});

// Mostrar la configuración para debug
console.log('API configurada con baseURL:', api.defaults.baseURL);
console.log('Headers predeterminados:', JSON.stringify(api.defaults.headers));

// Función para parsear error
const parseError = (error) => {
  let message = 'Error desconocido';
  let status = null;
  let data = null;

  if (error.response) {
    // El servidor respondió con un código de error
    status = error.response.status;
    data = error.response.data;
    message = data?.message || `Error ${status}`;
  } else if (error.request) {
    // La solicitud se hizo pero no se recibió respuesta
    message = 'No se recibió respuesta del servidor';
  } else {
    // Error de configuración
    message = error.message;
  }

  return { message, status, data };
};

// Interceptor para añadir el token de autenticación a las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Asegurar headers de CORS para todas las solicitudes
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    
    console.log(`[API] Enviando ${config.method.toUpperCase()} a: ${config.url}`);
    console.log('[API] Headers:', JSON.stringify(config.headers));
    if (config.data) {
      console.log('[API] Datos enviados:', JSON.stringify(config.data));
    }
    
    return config;
  },
  (error) => {
    console.error('[API] Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Respuesta exitosa de ${response.config.url}:`, response.status);
    if (response.data) {
      console.log('[API] Datos recibidos:', JSON.stringify(response.data));
    }
    return response;
  },
  (error) => {
    const parsedError = parseError(error);
    
    console.error(`[API] Error: ${parsedError.message}`);
    console.error('[API] Detalles:', parsedError.data);
    
    if (parsedError.status === 401) {
      console.log('[API] Error de autenticación, limpiando datos de sesión...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
    return Promise.reject(error);
  }
);

export default api; 