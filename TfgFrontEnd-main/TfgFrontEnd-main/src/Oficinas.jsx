import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navigateToHome } from "./general";
import authService from "./services/authService";

const Oficinas = () => {
  // Datos de las oficinas en Madrid
  const oficinas = [
    {
      id: 1,
      nombre: "Vivius Madrid Centro",
      direccion: "Calle Gran Vía 42, 28013 Madrid",
      telefono: "91 456 78 90",
      email: "madrid.centro@vivius.es",
      horario: "Lunes a Viernes: 9:00 - 20:00, Sábados: 10:00 - 14:00",
      coordenadas: { lat: 40.4200, lng: -3.7025 }
    },
    {
      id: 2,
      nombre: "Vivius Salamanca",
      direccion: "Calle Serrano 118, 28006 Madrid",
      telefono: "91 567 89 01",
      email: "madrid.salamanca@vivius.es",
      horario: "Lunes a Viernes: 9:00 - 20:00, Sábados: 10:00 - 14:00",
      coordenadas: { lat: 40.4305, lng: -3.6850 }
    },
    {
      id: 3,
      nombre: "Vivius Chamberí",
      direccion: "Calle Alberto Aguilera 15, 28015 Madrid",
      telefono: "91 678 90 12",
      email: "madrid.chamberi@vivius.es",
      horario: "Lunes a Viernes: 9:00 - 20:00, Sábados: 10:00 - 14:00",
      coordenadas: { lat: 40.4320, lng: -3.7086 }
    }
  ];

  // Oficina seleccionada para mostrar detalles en el infowindow
  const [oficinaSeleccionada, setOficinaSeleccionada] = useState(null);

  // Función para construir la URL del mapa con marcadores
  const buildMapUrl = () => {
    let baseUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24275.771557994225!2d-3.7099548741789345!3d40.428938942594354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42285e0b7c6447%3A0xa03bedb7e6db21a0!2sGran%20V%C3%ADa%2C%2042%2C%2028013%20Madrid!5e0!3m2!1ses!2ses!4v1651162847354!5m2!1ses!2ses";

    // Añadir marcadores a la URL
    oficinas.forEach(oficina => {
      baseUrl += `&markers=color:blue%7Clabel:V%7C${oficina.coordenadas.lat},${oficina.coordenadas.lng}`;
    });

    return baseUrl;
  };

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
      <main className="max-w-6xl mx-auto p-6 mt-8 mb-12">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Nuestras Oficinas en Madrid</h1>

        {/* Mapa */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-12">
          <div className="relative" style={{ height: "500px" }}>
            {/* Iframe con el mapa de Google Maps con marcadores en las ubicaciones */}
            <iframe
              src={buildMapUrl()}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de oficinas Vivius en Madrid"
            ></iframe>

            {/* Leyenda de oficinas */}
            <div className="absolute top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-10 max-w-sm">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">Oficinas Vivius</h3>
              <ul className="text-sm space-y-2">
                {oficinas.map(oficina => (
                  <li
                    key={oficina.id}
                    className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded transition"
                    onClick={() => setOficinaSeleccionada(oficina)}
                  >
                    <span className="w-4 h-4 rounded-full bg-blue-600 mr-2 flex items-center justify-center text-white text-xs font-bold">
                      {oficina.id}
                    </span>
                    <span>{oficina.nombre}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popup con información de la oficina seleccionada */}
            {oficinaSeleccionada && (
              <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg p-4 z-10 max-w-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-blue-600">{oficinaSeleccionada.nombre}</h3>
                  <button
                    onClick={() => setOficinaSeleccionada(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-gray-700 mb-2">{oficinaSeleccionada.direccion}</p>
                <p className="text-sm text-gray-700 mb-2">Tel: {oficinaSeleccionada.telefono}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${oficinaSeleccionada.direccion}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-100 text-blue-600 text-center py-2 rounded-lg hover:bg-blue-200 transition duration-200 text-sm"
                >
                  Cómo llegar
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Listado de oficinas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {oficinas.map(oficina => (
            <div
              key={oficina.id}
              className={`bg-white shadow-md rounded-lg overflow-hidden transition-all duration-200 ${oficinaSeleccionada?.id === oficina.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">{oficina.nombre}</h2>
                <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                  {oficina.id}
                </span>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">DIRECCIÓN</h3>
                    <p className="text-gray-700">{oficina.direccion}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">TELÉFONO</h3>
                    <p className="text-gray-700">{oficina.telefono}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">EMAIL</h3>
                    <p className="text-gray-700">{oficina.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">HORARIO DE ATENCIÓN</h3>
                    <p className="text-gray-700">{oficina.horario}</p>
                  </div>
                </div>
                <div className="mt-6 flex space-x-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${oficina.direccion}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-100 text-blue-600 text-center py-2 rounded-lg hover:bg-blue-200 transition duration-200"
                  >
                    Cómo llegar
                  </a>
                  <button
                    onClick={() => setOficinaSeleccionada(oficina)}
                    className="block w-1/3 bg-yellow-100 text-yellow-600 text-center py-2 rounded-lg hover:bg-yellow-200 transition duration-200"
                  >
                    Ver en mapa
                  </button>
                </div>
              </div>
            </div>
          ))}
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

export default Oficinas;
