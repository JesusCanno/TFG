import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminUserPanel, AdminBusinessRequests } from "./Account.jsx";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Barra superior */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/sinFondo.png" alt="Logo" className="h-10 w-auto mr-4" onClick={() => navigate('/')} style={{cursor: 'pointer'}} />
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/account" className="text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md transition">Mi cuenta</Link>
            <button
              onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
              className="text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700">Gestión de usuarios</h2>
          <p className="text-gray-600">Administra todos los usuarios de la plataforma desde aquí.</p>
        </div>
        <AdminUserPanel />
        <div className="my-12 border-t border-gray-200"></div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700">Solicitudes de cuentas empresariales</h2>
          <p className="text-gray-600">Gestiona las solicitudes de negocio recibidas.</p>
        </div>
        <AdminBusinessRequests />
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

export default AdminDashboard;
