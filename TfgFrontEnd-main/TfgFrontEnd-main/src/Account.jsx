import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navigateToHome } from "./general";
import authService from './services/authService';
import propertyService from './services/propertyService';
import adminService from './services/adminService';
import { businessService } from './services';

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
          {authService.getUserRole() !== 'negocio' && authService.getUserRole() !== 'admin' && (
            <Link to="/business" className="text-gray-600 hover:text-blue-600">¿Eres un negocio?</Link>
          )}
          {authService.getUserRole() === 'negocio' && (
            <Link to="/business-dashboard" className="text-gray-600 hover:text-blue-600 font-medium">
              Panel de negocio
            </Link>
          )}
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
                        {userRole === 'negocio' && (
                          <li>
                            <Link to="/business-dashboard" className="w-full block text-left px-4 py-2 text-yellow-700 hover:bg-yellow-100 rounded-md font-semibold">
                              Panel de negocio
                            </Link>
                          </li>
                        )}
                        {userRole === 'cliente' && (
                          <li>
                            <button
                              className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md`}
                              onClick={() => navigate('/favorites')}
                            >
                              Favoritos
                            </button>
                          </li>
                        )}
                        {userRole === 'admin' && (
                          <li>
                            <button
                              className={`w-full text-left px-4 py-2 text-purple-700 hover:bg-purple-100 rounded-md font-semibold`}
                              onClick={() => navigate('/admin-dashboard')}
                            >
                              Panel de administración
                            </button>
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

                    {activeSection === "favorites" && userRole === 'cliente' && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis favoritos</h2>
                        <p className="text-gray-600">Aquí aparecerán las propiedades que marques como favoritas.</p>
                        <Link to="/favorites" className="inline-block mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                          Ver favoritos
                        </Link>
                      </div>
                    )}

                    {activeSection === "businessRequests" && userRole === 'admin' && <AdminBusinessRequests />}

                    {activeSection === 'admin' && userRole === 'admin' && <AdminUserPanel />}
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-blue-700">Usuarios registrados</h3>
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">+ Crear usuario</button>
      </div>
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div key={user.id} className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-5 flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-800 text-lg">{user.name}</div>
                  <div className="text-gray-500 text-sm">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.rol === 'admin' ? 'bg-purple-100 text-purple-700' : user.rol === 'negocio' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}</span>
              </div>
              <div className="flex space-x-2 mt-2">
                <button onClick={() => handleEdit(user)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">Editar</button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Eliminar</button>
              </div>
            </div>
          ))}
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

function AdminBusinessRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMsg, setActionMsg] = useState("");

  const fetchRequests = () => {
    setLoading(true);
    businessService.getAllBusinessRequests()
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar las solicitudes');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await businessService.approveBusinessRequest(id);
      setActionMsg('Solicitud aprobada y usuario creado.');
      fetchRequests();
    } catch {
      setActionMsg('Error al aprobar la solicitud.');
    }
    setTimeout(() => setActionMsg(''), 4000);
  };

  const handleReject = async (id) => {
    try {
      await businessService.rejectBusinessRequest(id);
      setActionMsg('Solicitud rechazada y eliminada.');
      fetchRequests();
    } catch {
      setActionMsg('Error al rechazar la solicitud.');
    }
    setTimeout(() => setActionMsg(''), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Solicitudes de cuentas empresariales</h2>
      {actionMsg && <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded">{actionMsg}</div>}
      {loading ? (
        <p>Cargando solicitudes...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-600">No hay solicitudes pendientes.</p>
      ) : (
        <div className="space-y-6">
          {requests.map(req => (
            <div key={req.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="font-bold text-blue-700 text-lg">{req.company_name}</span>
                  <span className="ml-4 text-gray-500">{new Date(req.created_at).toLocaleString()}</span>
                </div>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-semibold">Pendiente</span>
              </div>
              <div className="mb-2"><b>Persona de contacto:</b> {req.contact_person}</div>
              <div className="mb-2"><b>Email:</b> {req.email}</div>
              {req.phone && <div className="mb-2"><b>Teléfono:</b> {req.phone}</div>}
              {req.business_type && <div className="mb-2"><b>Tipo de negocio:</b> {req.business_type}</div>}
              {req.employees && <div className="mb-2"><b>Empleados:</b> {req.employees}</div>}
              {req.description && <div className="mb-2"><b>Descripción:</b> {req.description}</div>}
              {req.services && (
                <div className="mb-2"><b>Servicios:</b> {JSON.parse(req.services).join(', ')}</div>
              )}
              <div className="flex space-x-4 mt-4">
                <button onClick={() => handleApprove(req.id)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Aprobar</button>
                <button onClick={() => handleReject(req.id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Rechazar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Account;
export { AdminUserPanel, AdminBusinessRequests };
