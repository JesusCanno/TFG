import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navigateToHome } from "./general";
import authService from './services/authService';
import propertyService from './services/propertyService';
import adminService from './services/adminService';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [userRole, setUserRole] = useState(null);
  const [myProperties, setMyProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const user = authService.getCurrentUser();
    setUserData(user);
    setUserRole(authService.getUserRole());
    if (user && (user.rol === 'negocio' || user.rol === 'admin')) {
      propertyService.getMyProperties().then(setMyProperties);
    }
  }, [navigate]);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
  };

  const navigateToFavorites = () => {
    navigate('/favorites');
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      {/* Barra de presentación superior */}
      <section className="bg-blue-600 text-white p-3">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            <Link to="/vende-tu-piso" className="hover:underline">Vende tu piso</Link>
            <Link to="/oficinas" className="ml-6 hover:underline">Oficinas</Link>
            <Link to="/valoracion" className="ml-6 hover:underline">Valora tu casa</Link>
            <Link to="/alquiler-vacacional" className="ml-6 hover:underline">Alquiler Vacacional</Link>
          </div>
          <div>
            <Link to="/contacto" className="ml-6 hover:underline">Contacto</Link>
            <Link to="/trabaja-con-nosotros" className="ml-6 hover:underline">Trabaja con nosotros</Link>
            <Link to="/franquicia" className="ml-6 hover:underline">Abre tu franquicia</Link>
          </div>
        </div>
      </section>

      {/* Barra de navegación */}
      <header className="flex justify-between items-center p-5 bg-white shadow-md" style={{ height: '90px' }}>
        <div className="flex items-center space-x-3 ml-6" onClick={navigateToHome}>
          <Link to="/">
            <img src="/sinFondo.png" alt="Logo" className="w-28 h-auto" />
          </Link>
        </div>
        <div className="flex space-x-6">
          <Link to="/business" className="text-gray-600 hover:text-blue-600">¿Eres un negocio?</Link>
          <Link to="/account" className="text-gray-600 hover:text-blue-600">Mi cuenta</Link>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow flex items-start justify-center p-6 my-8">
        {userData && (
          <div className="max-w-4xl w-full">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-blue-600 text-white p-6">
                <h1 className="text-2xl font-bold">Mi Cuenta</h1>
                <p className="mt-1">Gestiona tu información personal y preferencias</p>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  {/* Menú lateral */}
                  <div className="md:w-1/4 mb-6 md:mb-0">
                    <nav>
                      <ul className="space-y-2">
                        <li className={activeSection === "personal" ? "bg-blue-50 rounded-md" : ""}>
                          <button 
                            className={`w-full text-left px-4 py-2 ${activeSection === "personal" ? "text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100 rounded-md"}`}
                            onClick={() => setActiveSection("personal")}
                          >
                            Información personal
                          </button>
                        </li>
                        {(userRole === 'negocio' || userRole === 'admin') && (
                          <li className={activeSection === "properties" ? "bg-blue-50 rounded-md" : ""}>
                            <button 
                              className={`w-full text-left px-4 py-2 ${activeSection === "properties" ? "text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100 rounded-md"}`}
                              onClick={() => setActiveSection("properties")}
                            >
                              Mis propiedades
                            </button>
                          </li>
                        )}
                        <li>
                          <button 
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={navigateToFavorites}
                          >
                            Favoritos
                          </button>
                        </li>
                        <li className={activeSection === "alerts" ? "bg-blue-50 rounded-md" : ""}>
                          <button 
                            className={`w-full text-left px-4 py-2 ${activeSection === "alerts" ? "text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100 rounded-md"}`}
                            onClick={() => setActiveSection("alerts")}
                          >
                            Alertas
                          </button>
                        </li>
                        {userRole === 'admin' && (
                          <li>
                            <button className="w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-md" onClick={() => setActiveSection("admin")}>Panel de administración</button>
                          </li>
                        )}
                        <li>
                          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md">
                            Cerrar sesión
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  
                  {/* Contenido principal */}
                  <div className="md:w-3/4 md:pl-8">
                    {activeSection === "personal" && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Información personal</h2>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Nombre</label>
                            <div className="bg-gray-100 px-3 py-2 rounded-md w-full">{userData.name}</div>
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <div className="bg-gray-100 px-3 py-2 rounded-md w-full">{userData.email}</div>
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Rol</label>
                            <div className="bg-gray-100 px-3 py-2 rounded-md w-full">{userData.rol}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSection === "properties" && (userRole === 'negocio' || userRole === 'admin') && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis propiedades</h2>
                        {myProperties.length === 0 ? (
                          <p className="text-gray-600">No tienes propiedades publicadas actualmente.</p>
                        ) : (
                          <ul className="space-y-4">
                            {myProperties.map((prop) => (
                              <li key={prop.id} className="bg-gray-50 p-4 rounded shadow flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                  <Link to={`/inmueble/${prop.id}`} className="text-blue-600 hover:underline font-semibold">{prop.nombre}</Link>
                                  <div className="text-gray-600 text-sm">{prop.ubicacion}</div>
                                </div>
                                <div className="flex space-x-4 mt-2 md:mt-0">
                                  <span>Precio: <b>{prop.precio} €</b></span>
                                  <span>Metros: <b>{prop.area} m²</b></span>
                                  <span>Habitaciones: <b>{prop.habitaciones}</b></span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                        <Link to="/vende-tu-piso" className="inline-block mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                          Publicar una propiedad
                        </Link>
                      </div>
                    )}

                    {activeSection === "alerts" && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis alertas</h2>
                        <p className="text-gray-600">No tienes alertas configuradas actualmente.</p>
                        <button className="inline-block mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                          Crear nueva alerta
                        </button>
                      </div>
                    )}

                    {activeSection === "admin" && userRole === 'admin' && (
                      <div>
                        <h2 className="text-xl font-semibold text-purple-800 mb-6">Panel de administración</h2>
                        <p className="text-gray-600 mb-4">Gestiona los usuarios de la plataforma.</p>
                        {/* Gestión de usuarios */}
                        <AdminUserPanel />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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

function AdminUserPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', rol: 'cliente' });
  const [formError, setFormError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar este usuario?')) return;
    try {
      await adminService.deleteUserByAdmin(id);
      setUsers(users.filter(u => u.id !== id));
    } catch {
      alert('Error al eliminar usuario');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setForm({ name: user.name, email: user.email, password: '', rol: user.rol });
    setShowEdit(true);
    setFormError(null);
  };

  const handleCreate = () => {
    setForm({ name: '', email: '', password: '', rol: 'cliente' });
    setShowCreate(true);
    setFormError(null);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      if (showCreate) {
        await adminService.createUserByAdmin(form);
        setShowCreate(false);
      } else if (showEdit && selectedUser) {
        await adminService.updateUserByAdmin(selectedUser.id, form);
        setShowEdit(false);
      }
      fetchUsers();
    } catch (err) {
      setFormError('Error al guardar usuario. Revisa los datos.');
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">Usuarios</h3>
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Crear usuario</button>
      </div>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="bg-white border-b">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.rol}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(user)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal de crear/editar usuario */}
      {(showCreate || showEdit) && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h4 className="text-lg font-semibold mb-4">{showCreate ? 'Crear usuario' : 'Editar usuario'}</h4>
            {formError && <p className="text-red-600 mb-2">{formError}</p>}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Nombre</label>
                <input type="text" name="name" value={form.name} onChange={handleFormChange} className="w-full border rounded p-2" required />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleFormChange} className="w-full border rounded p-2" required />
              </div>
              <div>
                <label className="block text-gray-700">Contraseña {showEdit && <span className="text-gray-400">(dejar en blanco para no cambiar)</span>}</label>
                <input type="password" name="password" value={form.password} onChange={handleFormChange} className="w-full border rounded p-2" placeholder={showEdit ? "(Opcional)" : ""} />
              </div>
              <div>
                <label className="block text-gray-700">Rol</label>
                <select name="rol" value={form.rol} onChange={handleFormChange} className="w-full border rounded p-2">
                  <option value="admin">Admin</option>
                  <option value="negocio">Negocio</option>
                  <option value="cliente">Cliente</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => { setShowCreate(false); setShowEdit(false); }} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account; 