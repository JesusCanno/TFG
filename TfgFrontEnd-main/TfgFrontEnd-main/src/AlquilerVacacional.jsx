import React from "react";
import { Link } from "react-router-dom";
import { navigateToHome } from "./general";
import authService from "./services/authService";

const AlquilerVacacional = () => {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
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
          {authService.getUserRole() !== 'admin' && authService.getUserRole() !== 'negocio' && (
            <Link to="/business" className="text-gray-600 hover:text-blue-600">¿Eres un negocio?</Link>
          )}
          <Link to="/account" className="text-gray-600 hover:text-blue-600">Mi cuenta</Link>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-4xl mx-auto p-8 mt-16 mb-16">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 p-8 text-center">
            <img
              src="/sinFondo.png"
              alt="Logo Vivius"
              className="w-32 h-auto mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-white">Alquiler Vacacional</h1>
          </div>

          <div className="p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Próximamente!</h2>

            <p className="text-gray-600 text-lg mb-6 max-w-xl mx-auto">
              Estamos trabajando en nuestra plataforma de alquiler vacacional para ofrecerte las mejores opciones para tus vacaciones.
            </p>

            <div className="p-6 bg-blue-50 rounded-lg mb-8 max-w-lg mx-auto">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">¿Qué podrás encontrar?</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Apartamentos en primera línea de playa
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Casas rurales con encanto
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Chalets con piscina privada
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Apartamentos en destinos urbanos
                </li>
              </ul>
            </div>

            <p className="text-gray-600 mb-8">
              ¿Tienes una propiedad para alquiler vacacional? Regístrate y deja tus datos para ser de los primeros en unirte a nuestra plataforma.
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/"
                className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Volver a inicio
              </Link>
              <Link
                to="/contacto"
                className="bg-white border border-blue-600 text-blue-600 font-medium py-3 px-6 rounded-lg hover:bg-blue-50 transition duration-200"
              >
                Contactar con nosotros
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Pie de página */}
      <footer className="bg-blue-600 text-white py-4">
        <ul className="flex justify-center space-x-6">
          <li><Link to="/legal" className="hover:text-yellow-300">Aviso Legal</Link></li>
          <li><Link to="/about" className="hover:text-yellow-300">Conócenos</Link></li>
          <li><Link to="/contacto" className="hover:text-yellow-300">Contacto</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default AlquilerVacacional;
