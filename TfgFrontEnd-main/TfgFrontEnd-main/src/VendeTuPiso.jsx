import React from "react";
import { Link } from "react-router-dom";
import { navigateToHome } from "./general";
import authService from "./services/authService";

const VendeTuPiso = () => {
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
      <main className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg mt-12 mb-12">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Vende tu piso con nosotros</h1>

        <div className="mb-8">
          <img src="/casa.jpg" alt="Vende tu piso" className="w-full h-64 object-cover rounded-lg mb-6" />

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Por qué vender con Vivius?</h2>

          <p className="text-gray-700 mb-4">
            En Vivius nos encargamos de todo el proceso de venta de tu vivienda, desde la valoración inicial hasta la firma ante notario. Nuestro equipo de profesionales inmobiliarios te guiará durante todo el proceso para que la venta de tu propiedad sea una experiencia sin complicaciones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Valoración gratuita</h3>
              <p className="text-gray-700">Realizamos un estudio de mercado para determinar el valor óptimo de tu vivienda sin ningún coste.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Marketing profesional</h3>
              <p className="text-gray-700">Fotografías profesionales, tours virtuales y publicidad en los principales portales inmobiliarios.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Asesoría legal</h3>
              <p className="text-gray-700">Te acompañamos en todos los trámites legales necesarios para que la venta sea segura.</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Cómo funciona?</h2>

          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li><strong>Contacta con nosotros</strong> - Rellena el formulario o llámanos para concertar una visita.</li>
            <li><strong>Valoramos tu propiedad</strong> - Nuestros expertos evalúan tu vivienda según el mercado actual.</li>
            <li><strong>Plan de marketing</strong> - Creamos una estrategia personalizada para tu propiedad.</li>
            <li><strong>Gestionamos las visitas</strong> - Nos encargamos de mostrar tu vivienda a potenciales compradores.</li>
            <li><strong>Negociación y cierre</strong> - Te asesoramos en la negociación hasta cerrar la venta.</li>
          </ol>

          <div className="mt-6 text-center">
            <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-200">
              Solicitar valoración gratuita
            </button>
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

export default VendeTuPiso;
