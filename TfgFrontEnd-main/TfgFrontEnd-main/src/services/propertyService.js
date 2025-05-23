import api from './api';

// Servicio para gestionar propiedades inmobiliarias
const propertyService = {
  // Obtener todas las propiedades
  getProperties: async () => {
    try {
      console.log('Llamando a la API en: /inmueble');
      const response = await api.get('/inmueble');
      console.log('Respuesta de API inmuebles (completa):', response);
      console.log('Datos de respuesta:', response.data);
      
      // Si la API devuelve directamente los inmuebles como array
      if (Array.isArray(response.data)) {
        console.log('La respuesta es un array, devolviendo directamente');
        return response.data;
      }
      
      // Si la API devuelve un objeto que tiene una propiedad que podría contener los inmuebles
      if (response.data && typeof response.data === 'object') {
        console.log('La respuesta es un objeto, buscando arrays dentro del objeto');
        
        // Intenta encontrar una propiedad que contenga un array en la respuesta
        for (const key in response.data) {
          if (Array.isArray(response.data[key])) {
            console.log(`Encontrado array en propiedad: ${key}`);
            return response.data[key];
          }
        }
        
        // Si no hay un array explícito pero hay datos, devuelve el objeto completo
        if (Object.keys(response.data).length > 0) {
          console.log('No se encontró array pero hay datos, devolviendo como array de un solo elemento');
          // Si response.data es el inmueble mismo, lo devolvemos como array
          if (response.data.id && response.data.titulo) {
            return [response.data];
          }
          
          // Último recurso: convertir el objeto a array si tiene propiedades que parecen inmuebles
          const possibleProperties = [];
          for (const key in response.data) {
            if (response.data[key] && typeof response.data[key] === 'object' && response.data[key].id) {
              possibleProperties.push(response.data[key]);
            }
          }
          
          if (possibleProperties.length > 0) {
            console.log('Encontrados posibles inmuebles en el objeto:', possibleProperties);
            return possibleProperties;
          }
          
          console.log('Devolviendo objeto completo como array:', [response.data]);
          return [response.data];
        }
      }
      
      // Si la respuesta es solo texto o un valor primitivo
      if (typeof response.data === 'string' || typeof response.data === 'number') {
        console.log('Respuesta es un valor primitivo, no podemos procesarlo como inmuebles');
        return [];
      }
      
      // Si no se encontró un formato válido, devuelve un array vacío
      console.log('No se pudo determinar el formato de datos, devolviendo array vacío');
      return [];
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
      if (error.response) {
        console.error('Detalles del error:', error.response.status, error.response.data);
      }
      return [];
    }
  },

  // Obtener una propiedad por su ID
  getPropertyById: async (id) => {
    try {
      const response = await api.get(`/inmueble/${id}`);
      
      // Si la API devuelve un objeto con una propiedad "inmueble"
      if (response.data && response.data.inmueble) {
        return response.data.inmueble;
      }
      
      // Si la API devuelve directamente el objeto del inmueble
      return response.data;
    } catch (error) {
      console.error(`Error al obtener propiedad ${id}:`, error);
      throw error;
    }
  },

  // Buscar propiedades con filtros
  searchProperties: async (searchParams) => {
    try {
      const response = await api.get('/properties/search', {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Añadir una propiedad a favoritos (si tu API lo permite)
  addToFavorites: async (propertyId) => {
    // Implementar si tu API tiene endpoint de favoritos
  },

  // Eliminar una propiedad de favoritos (si tu API lo permite)
  removeFromFavorites: async (propertyId) => {
    // Implementar si tu API tiene endpoint de favoritos
  },

  // Obtener propiedades favoritas del usuario (si tu API lo permite)
  getFavorites: async () => {
    // Implementar si tu API tiene endpoint de favoritos
    return [];
  },

  // Solicitar información sobre una propiedad
  requestInfo: async (propertyId, contactInfo) => {
    try {
      const response = await api.post('/contacto', {
        property_id: propertyId,
        ...contactInfo
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Valorar una propiedad (si tienes esta funcionalidad)
  estimateProperty: async (propertyData) => {
    // Implementar si tu API tiene endpoint de valoración
  },

  // Obtener propiedades del usuario autenticado (negocio)
  getMyProperties: async () => {
    try {
      const response = await api.get('/mis-inmuebles');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default propertyService; 