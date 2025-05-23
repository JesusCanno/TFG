import api from './api';

// Servicio para manejar la autenticación con el backend de Laravel
const authService = {
  // Iniciar sesión
  login: async (email, password) => {
    try {
      console.log('Intentando iniciar sesión con email:', email);
      const response = await api.post('/login', { email, password });
      console.log('Respuesta completa de login:', response);
      
      // La respuesta puede venir en diferentes formatos, vamos a manejar ambos
      const token = response.data.access_token || response.data.token;
      const userData = response.data.user;
      
      if (token) {
        console.log('Token recibido, guardando en localStorage:', token.substring(0, 10) + '...');
        localStorage.setItem('token', token);
        
        if (userData) {
          console.log('Datos de usuario recibidos:', userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          // Si no hay datos de usuario pero hay token, intentar obtener los datos del usuario
          console.log('No se recibieron datos de usuario, pero hay token. Extrayendo información de usuario...');
          
          // Si los datos del usuario están en otra parte de la respuesta
          if (response.data.data && response.data.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
          } else if (response.data.id) {
            // Si los datos del usuario están en la respuesta principal
            localStorage.setItem('user', JSON.stringify(response.data));
          } else {
            console.error('No se encontraron datos de usuario en la respuesta');
          }
        }
        
        // Verificamos que se haya guardado correctamente
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        console.log('Usuario guardado en localStorage:', savedUser);
        console.log('Token guardado en localStorage:', savedToken ? 'Sí (presente)' : 'No (ausente)');
        
        // Devolver toda la respuesta
        return response.data;
      } else {
        console.error('No se recibió token en la respuesta de login');
        throw new Error('No se recibió token en la respuesta');
      }
    } catch (error) {
      console.error('Error en login:', error);
      console.error('Detalles del error:', error.response?.data);
      throw error;
    }
  },

  // Registrar usuario
  register: async (userData) => {
    try {
      console.log('Registrando usuario:', userData.email);
      const response = await api.post('/register', userData);
      
      // La respuesta puede venir en diferentes formatos, vamos a manejar ambos
      const token = response.data.access_token || response.data.token;
      const user = response.data.user;
      
      if (token) {
        console.log('Token de registro recibido, guardando en localStorage');
        localStorage.setItem('token', token);
        
        if (user) {
          console.log('Datos de usuario registrado:', user);
          localStorage.setItem('user', JSON.stringify(user));
        } else if (response.data.id) {
          // Si los datos del usuario están en la respuesta principal
          localStorage.setItem('user', JSON.stringify(response.data));
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  // Cerrar sesión
  logout: async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Obtener el usuario actual
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      console.log('Obteniendo usuario actual de localStorage:', userStr);
      if (!userStr) {
        console.log('No hay usuario en localStorage');
        return null;
      }
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      return null;
    }
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    console.log('Verificando autenticación, token presente:', !!token);
    return !!token;
  },

  // Obtener el perfil del usuario
  getUserProfile: async () => {
    try {
      const response = await api.get('/perfil');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar el perfil del usuario
  updateUserProfile: async (userData) => {
    try {
      const response = await api.put('/perfil', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener el rol del usuario
  getUserRole: () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('Obteniendo rol de usuario:', user?.rol);
      return user?.rol || null;
    } catch (error) {
      console.error('Error al obtener rol de usuario:', error);
      return null;
    }
  },

  // Comprobar si el usuario es admin
  isAdmin: () => {
    return authService.getUserRole() === 'admin';
  },

  // Comprobar si el usuario es negocio
  isBusiness: () => {
    return authService.getUserRole() === 'negocio';
  },

  // Comprobar si el usuario es usuario normal
  isUser: () => {
    return authService.getUserRole() === 'usuario';
  },
};

export default authService;