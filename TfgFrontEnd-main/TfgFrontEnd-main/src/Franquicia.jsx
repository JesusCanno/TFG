import React from "react";
import { Link } from "react-router-dom";
import { navigateToHome } from "./general";
import authService from "./services/authService";

const Franquicia = () => {
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

      {/* Hero section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-6">Abre tu franquicia Vivius</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Únete a la red inmobiliaria líder y emprende un negocio de éxito con todo nuestro apoyo y experiencia.
          </p>
          <a href="#contacto" className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-200">
            Solicitar información
          </a>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto p-6 my-12">
        {/* Ventajas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">¿Por qué elegir nuestra franquicia?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Modelo de negocio probado</h3>
              <p className="text-gray-600">Un modelo de negocio con más de 10 años de experiencia y resultados demostrados en el sector inmobiliario.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Formación continua</h3>
              <p className="text-gray-600">Programa completo de formación inicial y continua para ti y tu equipo, con las últimas tendencias del sector.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tecnología avanzada</h3>
              <p className="text-gray-600">Acceso a nuestro software exclusivo de gestión inmobiliaria y herramientas digitales de última generación.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Marketing y publicidad</h3>
              <p className="text-gray-600">Campañas de marketing nacional y local, presencia en portales inmobiliarios y estrategias de posicionamiento.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Soporte continuo</h3>
              <p className="text-gray-600">Equipo de soporte dedicado para ayudarte en cada etapa de tu negocio, desde la apertura hasta la operación diaria.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Marca reconocida</h3>
              <p className="text-gray-600">Forma parte de una marca con reconocimiento nacional y una imagen corporativa sólida y profesional.</p>
            </div>
          </div>
        </section>

        {/* Pasos para abrir una franquicia */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">¿Cómo abrir tu franquicia?</h2>

          <div className="relative">
            {/* Línea de tiempo vertical */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">1. Solicitud inicial</h3>
                  <p className="text-gray-600">Completa el formulario de contacto y nuestro equipo te contactará para una primera entrevista.</p>
                </div>
                <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">2. Presentación del modelo</h3>
                  <p className="text-gray-600">Te presentaremos detalladamente nuestro modelo de negocio, condiciones y ventajas de nuestra franquicia.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">3. Estudio de viabilidad</h3>
                  <p className="text-gray-600">Analizaremos juntos la viabilidad del negocio en tu zona de interés y elaboraremos un plan de negocio.</p>
                </div>
                <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">4. Firma del contrato</h3>
                  <p className="text-gray-600">Una vez acordadas las condiciones, procederemos a la firma del contrato de franquicia.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">5. Formación inicial</h3>
                  <p className="text-gray-600">Recibirás formación completa sobre nuestro sistema de trabajo, herramientas y procedimientos.</p>
                </div>
                <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                  <span className="text-white font-bold">5</span>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full">
                  <span className="text-white font-bold">6</span>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">6. Apertura y lanzamiento</h3>
                  <p className="text-gray-600">Te acompañaremos en todo el proceso de apertura y lanzamiento de tu franquicia Vivius.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Preguntas frecuentes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Cuál es la inversión inicial?</h3>
              <p className="text-gray-600">La inversión inicial varía según la ubicación y el tamaño del local, pero incluye el canon de entrada, adecuación del local y equipamiento. Te proporcionaremos un desglose detallado durante la presentación del modelo.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Necesito experiencia en el sector inmobiliario?</h3>
              <p className="text-gray-600">No es imprescindible, aunque se valora positivamente. Proporcionamos formación completa y continua para que puedas gestionar tu franquicia con éxito independientemente de tu experiencia previa.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Cuál es la duración del contrato?</h3>
              <p className="text-gray-600">Los contratos tienen una duración inicial de 5 años, renovables por periodos similares. Buscamos relaciones a largo plazo con nuestros franquiciados.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Cuáles son las regalías mensuales?</h3>
              <p className="text-gray-600">Las regalías mensuales corresponden a un porcentaje sobre la facturación, que incluye el uso de la marca, soporte continuo y actualizaciones del sistema. El porcentaje exacto se detalla en la presentación del modelo.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Qué territorios están disponibles?</h3>
              <p className="text-gray-600">Actualmente tenemos disponibilidad en diversas zonas de España. Durante el proceso de solicitud analizaremos la viabilidad de tu zona de interés y la exclusividad territorial.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">¿Cuánto tiempo tarda la apertura?</h3>
              <p className="text-gray-600">El tiempo estimado desde la firma del contrato hasta la apertura es de aproximadamente 2-3 meses, dependiendo de factores como la disponibilidad del local y los trámites administrativos.</p>
            </div>
          </div>
        </section>

        {/* Formulario de contacto */}
        <section id="contacto" className="bg-white p-8 rounded-lg shadow-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Solicita información</h2>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">Nombre completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="ciudad" className="block text-gray-700 font-medium mb-2">Ciudad de interés *</label>
                <input
                  type="text"
                  id="ciudad"
                  name="ciudad"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">Mensaje (opcional)</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="privacidad"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="privacidad" className="ml-2 block text-sm text-gray-700">
                He leído y acepto la <Link to="/legal" className="text-blue-600 hover:underline">política de privacidad</Link> y autorizo el tratamiento de mis datos.
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              Solicitar información
            </button>
          </form>
        </section>
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

export default Franquicia;
