import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navigateToHome } from "./general";
import authService from "./services/authService";

const Contacto = () => {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: ""
  });

  // Estado para mostrar mensaje de éxito
  const [enviado, setEnviado] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario a un backend
    console.log("Formulario enviado:", formData);

    // Simulamos el envío exitoso
    setEnviado(true);

    // Resetear el formulario
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      asunto: "",
      mensaje: ""
    });

    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      setEnviado(false);
    }, 5000);
  };

  // Datos ficticios de la empresa
  const datosEmpresa = {
    nombre: "Vivius Inmobiliaria",
    direccion: "Calle Gran Vía 42, 28013 Madrid",
    telefono: "+34 91 123 45 67",
    email: "info@vivius.es",
    horario: "Lunes a Viernes: 9:00 - 20:00, Sábados: 10:00 - 14:00"
  };

  // Oficinas
  const oficinas = [
    {
      id: 1,
      nombre: "Madrid Centro",
      direccion: "Calle Gran Vía 42, 28013 Madrid",
      telefono: "91 456 78 90"
    },
    {
      id: 2,
      nombre: "Salamanca",
      direccion: "Calle Serrano 118, 28006 Madrid",
      telefono: "91 567 89 01"
    },
    {
      id: 3,
      nombre: "Chamberí",
      direccion: "Calle Alberto Aguilera 15, 28015 Madrid",
      telefono: "91 678 90 12"
    }
  ];

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
      <main className="max-w-6xl mx-auto p-6 my-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Contacta con Nosotros</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario de contacto */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-blue-600 p-4">
              <h2 className="text-xl font-semibold text-white">Escríbenos</h2>
            </div>

            <div className="p-6">
              {enviado && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  <strong className="font-bold">¡Mensaje enviado!</strong>
                  <span className="block sm:inline"> Nos pondremos en contacto contigo lo antes posible.</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">Nombre completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="asunto" className="block text-gray-700 font-medium mb-2">Asunto *</label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="compra">Compra de inmueble</option>
                    <option value="venta">Venta de inmueble</option>
                    <option value="alquiler">Alquiler</option>
                    <option value="tasacion">Tasación</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="privacidad"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="privacidad" className="ml-2 block text-sm text-gray-700">
                    He leído y acepto la <Link to="/legal" className="text-blue-600 hover:underline">política de privacidad</Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>

          {/* Información de contacto */}
          <div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
              <div className="bg-blue-600 p-4">
                <h2 className="text-xl font-semibold text-white">Información de contacto</h2>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{datosEmpresa.nombre}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{datosEmpresa.direccion}</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{datosEmpresa.telefono}</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{datosEmpresa.email}</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{datosEmpresa.horario}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Síguenos</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-500 hover:text-blue-600">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-blue-600">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-blue-600">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-blue-600">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Nuestras oficinas */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-blue-600 p-4">
                <h2 className="text-xl font-semibold text-white">Nuestras oficinas</h2>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {oficinas.map(oficina => (
                    <div key={oficina.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-gray-800 mb-1">Vivius {oficina.nombre}</h3>
                      <p className="text-gray-600 mb-1">{oficina.direccion}</p>
                      <p className="text-gray-600">{oficina.telefono}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    to="/oficinas"
                    className="block w-full bg-gray-100 text-gray-700 text-center py-2 rounded-lg hover:bg-gray-200 transition duration-200"
                  >
                    Ver todas las oficinas
                  </Link>
                </div>
              </div>
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

export default Contacto;
