import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { navigateToHome } from "./general";
import authService from './services/authService';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  // Verificar si ya hay sesión activa al cargar
  useEffect(() => {
    console.log('Componente Login montado. Path actual:', location.pathname);
    console.log('Estado de autenticación:', authService.isAuthenticated());
    
    if (authService.isAuthenticated()) {
      const userRole = authService.getUserRole();
      console.log('Usuario ya autenticado, rol:', userRole);
      
      if (userRole === 'negocio') {
        console.log('Redirigiendo a panel de negocio (ya autenticado)');
        window.location.href = '/business-dashboard';
      } else {
        console.log('Redirigiendo a cuenta normal (ya autenticado)');
        window.location.href = '/account';
      }
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setDebugInfo("");
    
    if (!email || !password) {
      setErrorMessage("Por favor, introduce tu email y contraseña");
      return;
    }
    
    try {
      setRedirecting(true);
      console.log('Enviando solicitud de login...');
      
      // Mostrar los datos que se envían al servidor
      setDebugInfo(`Enviando login con: ${email}, ${password.substring(0, 1)}${'*'.repeat(password.length - 1)}`);
      
      const response = await authService.login(email, password);
      console.log("Login exitoso:", response);
      setDebugInfo(prev => `${prev}\nRespuesta recibida: ${JSON.stringify(response)}`);
      
      // Verificar que se guardó el token
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      setDebugInfo(prev => `${prev}\nToken guardado: ${token ? 'Sí' : 'No'}`);
      setDebugInfo(prev => `${prev}\nUsuario guardado: ${user ? 'Sí' : 'No'}`);
      
      if (!token) {
        throw new Error("No se pudo guardar el token");
      }
      
      // Parsear el usuario para obtener el rol
      const userObj = JSON.parse(user || '{}');
      const role = userObj?.rol;
      
      setDebugInfo(prev => `${prev}\nRol del usuario: ${role || 'No encontrado'}`);
      
      // Esperar un poco para asegurar que localStorage se actualice
      setTimeout(() => {
        if (role === 'negocio') {
          setDebugInfo(prev => `${prev}\nRedirigiendo a: /business-dashboard`);
          window.location.replace('/business-dashboard');
        } else {
          setDebugInfo(prev => `${prev}\nRedirigiendo a: /account`);
          window.location.replace('/account');
        }
      }, 1500);
    } catch (error) {
      setRedirecting(false);
      console.error("Error login:", error);
      setErrorMessage(error.response?.data?.message || error.message || 'Error al iniciar sesión');
      setDebugInfo(`Error: ${JSON.stringify(error.response?.data || error.message)}`);
    }
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
      <main className="max-w-md mx-auto p-6 my-12 flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Iniciar sesión</h1>
            <p className="text-gray-600 mt-2">Accede a tu cuenta para gestionar tus propiedades</p>
          </div>
          
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{errorMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                disabled={redirecting}
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-gray-700 font-medium">Contraseña</label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</Link>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                disabled={redirecting}
              />
            </div>
            
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                disabled={redirecting}
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Recordarme
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              disabled={redirecting}
            >
              {redirecting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
          
          {redirecting && (
            <div className="mt-4 text-center">
              <p className="text-blue-600">Iniciando sesión, por favor espera...</p>
            </div>
          )}
          
          {debugInfo && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono">
              <pre className="whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate</Link></p>
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

export default Login; 