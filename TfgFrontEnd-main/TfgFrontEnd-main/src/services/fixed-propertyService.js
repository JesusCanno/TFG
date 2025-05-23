import api from './api';

// Servicio para gestionar propiedades inmobiliarias
const propertyService = {
  // Obtener todas las propiedades
  getProperties: async () => {
    try {
      console.log('Llamando a la API en: /inmueble');
      const response = await api.get('/inmueble');
      console.log('Respuesta de API inmuebles (completa):', response);
      
      // Devolver los datos directamente
      return response.data;
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
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

  // Solicitar información sobre una propiedad
  requestInfo: async (propertyId, contactInfo) => {
    try {
      const response = await api.post('/contacto', {
        inmueble_id: propertyId,
        ...contactInfo
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener propiedades del usuario autenticado (negocio)
  getMyProperties: async () => {
    try {
      console.log('Solicitando propiedades del usuario autenticado a: /mis-inmuebles');
      const response = await api.get('/mis-inmuebles');
      console.log('Respuesta de API mis-inmuebles (completa):', response);
      
      if (Array.isArray(response.data)) {
        console.log('La respuesta es un array con', response.data.length, 'propiedades');
        return response.data;
      } else if (response.data && typeof response.data === 'object') {
        console.log('La respuesta es un objeto, intentando extraer propiedades');
        // Intenta buscar un array en las propiedades del objeto
        for (const key in response.data) {
          if (Array.isArray(response.data[key])) {
            console.log(`Encontrado array en la propiedad ${key} con ${response.data[key].length} elementos`);
            return response.data[key];
          }
        }
        // Si no hay un array, pero el objeto mismo es una propiedad
        if (response.data.id) {
          console.log('La respuesta parece ser una única propiedad, devolviendo como array');
          return [response.data];
        }
      }
      
      console.log('No se pudo determinar el formato de propiedades, devolviendo array vacío');
      return [];
    } catch (error) {
      console.error('Error al obtener propiedades del usuario:', error);
      if (error.response) {
        console.error('Detalles del error:', error.response.status, error.response.data);
      }
      return [];
    }
  },
  
  // Eliminar una propiedad
  deleteProperty: async (id) => {
    try {
      await api.delete(`/inmueble/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar propiedad ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva propiedad
  createProperty: async (propertyData) => {
    try {
      console.log('Creando nueva propiedad con datos:', propertyData);
      
      // Configuración especial para FormData (archivos)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await api.post('/inmueble', propertyData, config);
      console.log('Respuesta de creación de propiedad:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al crear propiedad:', error);
      if (error.response) {
        console.error('Detalles del error:', error.response.status, error.response.data);
      }
      throw error;
    }
  },

  // Actualizar una propiedad existente
  updateProperty: async (id, propertyData) => {
    try {
      console.log(`Actualizando propiedad ${id} con datos:`, propertyData);
      
      // Configuración especial para FormData (archivos)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      // Usar POST con _method=PUT para compatibilidad con Laravel al enviar archivos
      propertyData.append('_method', 'PUT');
      const response = await api.post(`/inmueble/${id}`, propertyData, config);
      
      console.log('Respuesta de actualización de propiedad:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar propiedad ${id}:`, error);
      if (error.response) {
        console.error('Detalles del error:', error.response.status, error.response.data);
      }
      throw error;
    }
  },
};

export default propertyService; 