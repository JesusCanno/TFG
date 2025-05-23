import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navigateToHome } from "./general";

const TrabajaConNosotros = () => {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    puesto: "",
    experiencia: "",
    mensaje: "",
    cv: null
  });
  
  // Estado para mostrar mensaje de éxito
  const [enviado, setEnviado] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario a un backend
    console.log("Solicitud de empleo enviada:", formData);
    
    // Simulamos el envío exitoso
    setEnviado(true);
    window.scrollTo(0, 0);
    
    // Resetear el formulario después de 5 segundos
    setTimeout(() => {
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        puesto: "",
        experiencia: "",
        mensaje: "",
        cv: null
      });
      setEnviado(false);
    }, 5000);
  };

  // Ofertas de trabajo disponibles
  const ofertas = [
    {
      id: 1,
      titulo: "Agente Inmobiliario Senior",
      ubicacion: "Madrid Centro",
      tipo: "Tiempo completo",
      descripcion: "Buscamos un agente inmobiliario con experiencia para unirse a nuestro equipo en la oficina de Madrid Centro. El candidato ideal tiene al menos 3 años de experiencia en el sector y una sólida cartera de clientes."
    },
    {
      id: 2,
      titulo: "Asesor Inmobiliario Junior",
      ubicacion: "Salamanca, Madrid",
      tipo: "Tiempo completo",
      descripcion: "Oportunidad para profesionales con poca o ninguna experiencia que deseen desarrollar una carrera en el sector inmobiliario. Ofrecemos formación completa y un plan de carrera atractivo."
    },
    {
      id: 3,
      titulo: "Especialista en Marketing Digital",
      ubicacion: "Remoto",
      tipo: "Tiempo completo",
      descripcion: "Responsable de coordinar las estrategias de marketing digital de la empresa, incluyendo redes sociales, SEO, SEM y email marketing. Se requiere experiencia en el sector inmobiliario."
    },
    {
      id: 4,
      titulo: "Asistente Administrativo",
      ubicacion: "Chamberí, Madrid",
      tipo: "Medio tiempo",
      descripcion: "Buscamos una persona organizada y con habilidades administrativas para apoyar las operaciones diarias de nuestra oficina en Chamberí. Horario flexible."
    }
  ];

  // Beneficios de trabajar con nosotros
  const beneficios = [
    {
      titulo: "Comisiones competitivas",
      descripcion: "Estructura de comisiones transparente y competitiva que recompensa tu esfuerzo y resultados.",
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      titulo: "Formación continua",
      descripcion: "Programa de formación continua para potenciar tus habilidades y conocimientos inmobiliarios.",
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    },
    {
      titulo: "Conciliación laboral",
      descripcion: "Horarios flexibles y posibilidad de trabajo remoto para ayudarte a equilibrar tu vida personal y profesional.",
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      titulo: "Herramientas tecnológicas",
      descripcion: "Acceso a las últimas herramientas tecnológicas para optimizar tu trabajo y mejorar tu productividad.",
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      titulo: "Plan de carrera",
      descripcion: "Oportunidades de crecimiento profesional con un plan de carrera claro y definido.",
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      titulo: "Ambiente de trabajo",
      descripcion: "Ambiente de trabajo colaborativo y dinámico, con un equipo joven y motivado.",
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
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
          <Link to="/business" className="text-gray-600 hover:text-blue-600">¿Eres un negocio?</Link>
          <Link to="/account" className="text-gray-600 hover:text-blue-600">Mi cuenta</Link>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-6">¡Únete a nuestro equipo!</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            En Vivius, estamos buscando personas talentosas y apasionadas que quieran crecer profesionalmente en el sector inmobiliario.
          </p>
          <a href="#ofertas" className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition duration-200">
            Ver ofertas disponibles
          </a>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto p-6 my-12">
        {enviado && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded mb-8 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-bold">¡Solicitud enviada con éxito!</p>
              <p>Gracias por tu interés en formar parte de nuestro equipo. Revisaremos tu solicitud y nos pondremos en contacto contigo lo antes posible.</p>
            </div>
          </div>
        )}
        
        {/* Beneficios de trabajar con nosotros */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">¿Por qué trabajar con nosotros?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  {beneficio.icono}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{beneficio.titulo}</h3>
                <p className="text-gray-600">{beneficio.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Ofertas de trabajo */}
        <section id="ofertas" className="mb-16 scroll-mt-24">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ofertas disponibles</h2>
          
          <div className="space-y-6">
            {ofertas.map(oferta => (
              <div key={oferta.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{oferta.titulo}</h3>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2 md:mt-0">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {oferta.ubicacion}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {oferta.tipo}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{oferta.descripcion}</p>
                <a 
                  href="#aplicar" 
                  className="inline-block text-blue-600 font-semibold hover:text-blue-800 hover:underline"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      puesto: oferta.titulo
                    });
                    document.getElementById('puesto').value = oferta.titulo;
                  }}
                >
                  Aplicar a esta oferta →
                </a>
              </div>
            ))}
          </div>
        </section>
        
        {/* Formulario de aplicación */}
        <section id="aplicar" className="bg-white p-8 rounded-lg shadow-lg scroll-mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Envía tu candidatura</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
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
              
              <div>
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
              
              <div>
                <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">Teléfono *</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="puesto" className="block text-gray-700 font-medium mb-2">Puesto al que aplicas *</label>
                <select
                  id="puesto"
                  name="puesto"
                  value={formData.puesto}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Selecciona un puesto</option>
                  {ofertas.map(oferta => (
                    <option key={oferta.id} value={oferta.titulo}>{oferta.titulo}</option>
                  ))}
                  <option value="otro">Otro (especificar en el mensaje)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="experiencia" className="block text-gray-700 font-medium mb-2">Años de experiencia *</label>
                <select
                  id="experiencia"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Selecciona</option>
                  <option value="sin-experiencia">Sin experiencia</option>
                  <option value="1-2">1-2 años</option>
                  <option value="3-5">3-5 años</option>
                  <option value="6-10">6-10 años</option>
                  <option value="10+">Más de 10 años</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="cv" className="block text-gray-700 font-medium mb-2">Currículum (PDF) *</label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  accept=".pdf"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Solo archivos PDF. Máximo 5MB.</p>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">Carta de presentación o mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
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
                He leído y acepto la <Link to="/legal" className="text-blue-600 hover:underline">política de privacidad</Link> y autorizo el tratamiento de mis datos personales para la gestión de mi candidatura.
              </label>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              Enviar solicitud
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

export default TrabajaConNosotros; 