import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navigateToHome } from './general';
import propertyService from './services/fixed-propertyService';
import authService from './services/authService';
import { getImageUrl } from './config';
import contactService from './services/contactService';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('properties');

  // Verificar que el usuario está autenticado y es de tipo negocio
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('==========================================');
        console.log('INICIANDO VERIFICACIÓN EN BUSINESS DASHBOARD');
        console.log('URL actual:', window.location.pathname);
        console.log('==========================================');
        
        const isAuth = authService.isAuthenticated();
        console.log('¿Usuario autenticado?', isAuth);
        
        if (!isAuth) {
          console.log('Usuario no autenticado, redirigiendo a login');
          window.location.href = '/login';
          return;
        }
        
        const currentUser = authService.getCurrentUser();
        console.log('Usuario actual en BusinessDashboard:', currentUser);
        
        if (!currentUser) {
          console.error('No se encontraron datos de usuario a pesar de tener token');
          localStorage.removeItem('token'); // Limpiar token inválido
          window.location.href = '/login';
          return;
        }
        
        console.log('Rol del usuario en dashboard:', currentUser.rol);
        if (currentUser.rol !== 'negocio') {
          console.log('Usuario no es de tipo negocio, redirigiendo a home');
          window.location.href = '/';
          return;
        }
        
        // Si llegamos aquí, el usuario está autenticado y es de tipo negocio
        console.log('Verificación completada: Usuario autorizado para BusinessDashboard');
        setUser(currentUser);
        setLoading(false);
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        setError('No se pudo verificar tu cuenta. Por favor, inicia sesión de nuevo.');
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Cargar las propiedades del usuario
  useEffect(() => {
    if (user) {
      const loadProperties = async () => {
        try {
          setLoading(true);
          console.log('Intentando cargar propiedades para el usuario:', user.name, 'con ID:', user.id);
          const data = await propertyService.getMyProperties();
          console.log('Propiedades cargadas en el dashboard:', data);
          setProperties(Array.isArray(data) ? data : []);
          setError(null);
        } catch (err) {
          console.error('Error al cargar propiedades:', err);
          setError('No se pudieron cargar tus propiedades. Intenta de nuevo más tarde.');
        } finally {
          setLoading(false);
        }
      };
      
      loadProperties();
    }
  }, [user]);

  // Simulación de contactos (en producción se cargarían desde la API)
  useEffect(() => {
    if (user) {
      const loadContacts = async () => {
        try {
          const data = await contactService.getMyContacts();
          setContacts(Array.isArray(data) ? data : []);
        } catch (err) {
          setContacts([]);
          console.error('Error al cargar contactos:', err);
        }
      };
      loadContacts();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  const handlePropertyDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta propiedad? Esta acción no se puede deshacer.')) {
      try {
        // En producción, llamar a la API para eliminar
        await propertyService.deleteProperty(id);
        setProperties(properties.filter(prop => prop.id !== id));
        alert('Propiedad eliminada correctamente');
      } catch (err) {
        console.error('Error al eliminar la propiedad:', err);
        alert('Error al eliminar la propiedad. Intenta de nuevo más tarde.');
      }
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await contactService.markContactAsRead(id);
      // Recargar los contactos desde la API para reflejar el cambio real
      const data = await contactService.getMyContacts();
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error al marcar contacto como leído:', err);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/login')} 
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Volver a iniciar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Barra superior */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/sinFondo.png" alt="Logo" className="h-10 w-auto mr-4" onClick={navigateToHome} style={{cursor: 'pointer'}} />
            <h1 className="text-2xl font-bold">Panel de Negocio</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Hola, {user?.name}</span>
            <button 
              onClick={handleLogout}
              className="text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Propiedades</h2>
            <p className="text-3xl font-bold text-blue-600">{properties.length}</p>
            <p className="text-gray-500 mt-1">Propiedades publicadas</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Contactos</h2>
            <p className="text-3xl font-bold text-blue-600">{contacts.length}</p>
            <p className="text-gray-500 mt-1">Solicitudes de información</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Sin leer</h2>
            <p className="text-3xl font-bold text-yellow-500">
              {contacts.filter(c => !c.leido).length}
            </p>
            <p className="text-gray-500 mt-1">Mensajes pendientes</p>
          </div>
        </div>
        
        {/* Pestañas */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                className={`py-4 px-6 font-medium ${activeTab === 'properties' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('properties')}
              >
                Mis Propiedades
              </button>
              <button
                className={`py-4 px-6 font-medium ${activeTab === 'contacts' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('contacts')}
              >
                Contactos Recibidos
              </button>
              <button
                className={`py-4 px-6 font-medium ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('profile')}
              >
                Mi Perfil
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {/* Contenido de Mis Propiedades */}
            {activeTab === 'properties' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Mis Propiedades</h2>
                  <Link
                    to="/crear-inmueble"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    + Añadir propiedad
                  </Link>
                </div>
                
                {properties.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No tienes propiedades publicadas</p>
                    <Link
                      to="/crear-inmueble"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Publicar mi primera propiedad
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Propiedad
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Precio
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Operación
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {properties.map((property) => (
                          <tr key={property.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img 
                                    className="h-10 w-10 rounded-md object-cover" 
                                    src={getImageUrl(property.foto)} 
                                    alt={property.titulo} 
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {property.titulo}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {property.direccion}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{property.precio} €</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${property.operacion === 'venta' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                {property.operacion === 'venta' ? 'Venta' : 'Alquiler'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${property.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {property.activo ? 'Publicado' : 'Borrador'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Link 
                                  to={`/editar-inmueble/${property.id}`}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Editar
                                </Link>
                                <button
                                  onClick={() => handlePropertyDelete(property.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Eliminar
                                </button>
                                <Link 
                                  to={`/inmueble/${property.id}`}
                                  className="text-green-600 hover:text-green-900"
                                  target="_blank"
                                >
                                  Ver
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
            {/* Contenido de Contactos */}
            {activeTab === 'contacts' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Contactos Recibidos</h2>
                
                {contacts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No has recibido contactos todavía</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div 
                        key={contact.id} 
                        className={`bg-white border rounded-lg p-4 ${!contact.leido ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{contact.nombre}</h3>
                            <p className="text-sm text-gray-500">
                              {contact.email} • {contact.telefono} • {contact.fecha}
                            </p>
                          </div>
                          {!contact.leido && (
                            <button
                              onClick={() => handleMarkAsRead(contact.id)}
                              className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-md hover:bg-yellow-200"
                            >
                              Marcar como leído
                            </button>
                          )}
                        </div>
                        <div className="mt-3">
                          <p className="text-gray-700">{contact.mensaje}</p>
                        </div>
                        <div className="mt-3 border-t border-gray-200 pt-3">
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Propiedad:</span> {
                              properties.find(p => p.id === contact.inmueble_id)?.titulo || `Inmueble #${contact.inmueble_id}`
                            }
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Contenido de Mi Perfil */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Mi Perfil</h2>
                
                <div className="bg-white overflow-hidden border border-gray-200 rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <dl className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                        <dd className="mt-1 text-lg font-medium text-gray-900">{user?.name}</dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-lg font-medium text-gray-900">{user?.email}</dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Tipo de cuenta</dt>
                        <dd className="mt-1">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {user?.rol === 'negocio' ? 'Profesional/Negocio' : user?.rol}
                          </span>
                        </dd>
                      </div>
                      
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Propiedades publicadas</dt>
                        <dd className="mt-1 text-lg font-medium text-gray-900">{properties.length}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="px-4 py-4 bg-gray-50 sm:px-6">
                    <Link
                      to="/editar-perfil"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Editar perfil
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Pie de página */}
      <footer className="bg-blue-600 text-white py-4 mt-auto">
        <ul className="flex justify-center space-x-6">
          <li><Link to="/legal" className="hover:text-yellow-300">Aviso Legal</Link></li>
          <li><Link to="/about" className="hover:text-yellow-300">Conócenos</Link></li>
          <li><Link to="/contacto" className="hover:text-yellow-300">Contacto</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default BusinessDashboard; 