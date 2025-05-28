import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import VendeTuPiso from './VendeTuPiso.jsx'
import Oficinas from './Oficinas.jsx'
import AlquilerVacacional from './AlquilerVacacional.jsx'
import Contacto from './Contacto.jsx'
import ValoraTuCasa from './ValoraTuCasa.jsx'
import TrabajaConNosotros from './TrabajaConNosotros.jsx'
import Franquicia from './Franquicia.jsx'
import About from './About.jsx'
import Legal from './Legal.jsx'
import Account from './Account.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Favorites from './Favorites.jsx'
import Business from './Business.jsx'
import BusinessDashboard from './BusinessDashboard.jsx'
import PropertyDetail from './PropertyDetail'
import CreateProperty from './CreateProperty.jsx'
import EditProperty from './EditProperty.jsx'
import AdminDashboard from './AdminDashboard'
import './App.css'
import authService from './services/authService'

// Imprime información de debug en la consola
console.log('====== INICIANDO APLICACIÓN ======');
console.log('URL base:', window.location.origin);
console.log('Ruta actual:', window.location.pathname);

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  const isAuth = authService.isAuthenticated();
  console.log('Verificando autenticación en rutas. Resultado:', isAuth);
  return isAuth;
};

// Función para verificar si el usuario tiene rol de negocio
const isBusinessUser = () => {
  const role = authService.getUserRole();
  console.log('Verificando rol de negocio. Rol actual:', role);
  return role === 'negocio';
};

// Componente para rutas protegidas generales
const ProtectedRoute = ({ children }) => {
  console.log('Evaluando ruta protegida general');
  if (!isAuthenticated()) {
    console.log('Acceso denegado: Usuario no autenticado');
    return <Navigate to="/login" replace />;
  }
  console.log('Acceso permitido: Usuario autenticado');
  return children;
};

// Componente para rutas protegidas específicas para negocio
const BusinessRoute = ({ children }) => {
  console.log('Evaluando ruta protegida de negocio');
  if (!isAuthenticated()) {
    console.log('Acceso denegado: Usuario no autenticado');
    return <Navigate to="/login" replace />;
  }

  if (!isBusinessUser()) {
    console.log('Acceso denegado: Usuario no es de tipo negocio');
    return <Navigate to="/" replace />;
  }

  console.log('Acceso permitido: Usuario autenticado con rol de negocio');
  return children;
};

// Componente para la página no encontrada
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </a>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/vende-tu-piso" element={<VendeTuPiso />} />
        <Route path="/oficinas" element={<Oficinas />} />
        <Route path="/alquiler-vacacional" element={<AlquilerVacacional />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/valoracion" element={<ValoraTuCasa />} />
        <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
        <Route path="/franquicia" element={<Franquicia />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/business" element={<Business />} />
        <Route path="/inmueble/:id" element={<PropertyDetail />} />

        {/* Rutas protegidas */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/business-dashboard"
          element={
            <BusinessRoute>
              <BusinessDashboard />
            </BusinessRoute>
          }
        />

        {/* Rutas para gestión de propiedades */}
        <Route
          path="/crear-inmueble"
          element={
            <BusinessRoute>
              <CreateProperty />
            </BusinessRoute>
          }
        />

        <Route
          path="/editar-inmueble/:id"
          element={
            <BusinessRoute>
              <EditProperty />
            </BusinessRoute>
          }
        />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Ruta para página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
