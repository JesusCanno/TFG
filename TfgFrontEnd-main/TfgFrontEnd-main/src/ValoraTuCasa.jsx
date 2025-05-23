import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navigateToHome } from "./general";

const ValoraTuCasa = () => {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    direccion: "",
    tipo: "",
    metros: "",
    habitaciones: "",
    banos: "",
    antiguedad: "",
    estado: "",
    extras: [],
    nombre: "",
    telefono: "",
    email: ""
  });
  
  // Estado para mostrar mensaje de éxito
  const [enviado, setEnviado] = useState(false);
  
  // Estado para la etapa actual del formulario (1: datos propiedad, 2: datos contacto)
  const [etapa, setEtapa] = useState(1);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Para manejar múltiples checkboxes
      if (checked) {
        setFormData({
          ...formData,
          extras: [...formData.extras, value]
        });
      } else {
        setFormData({
          ...formData,
          extras: formData.extras.filter(extra => extra !== value)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Siguiente etapa
  const irSiguienteEtapa = (e) => {
    e.preventDefault();
    setEtapa(2);
    window.scrollTo(0, 0);
  };
  
  // Etapa anterior
  const irEtapaAnterior = () => {
    setEtapa(1);
    window.scrollTo(0, 0);
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario a un backend
    console.log("Valoración solicitada:", formData);
    
    // Simulamos el envío exitoso
    setEnviado(true);
    window.scrollTo(0, 0);
    
    // Resetear el formulario después de 5 segundos
    setTimeout(() => {
      setFormData({
        direccion: "",
        tipo: "",
        metros: "",
        habitaciones: "",
        banos: "",
        antiguedad: "",
        estado: "",
        extras: [],
        nombre: "",
        telefono: "",
        email: ""
      });
      setEtapa(1);
      setEnviado(false);
    }, 8000);
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
          <Link to="/business" className="text-gray-600 hover:text-blue-600">¿Eres un negocio?</Link>
          <Link to="/account" className="text-gray-600 hover:text-blue-600">Mi cuenta</Link>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-5xl mx-auto p-6 my-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-3">¿Cuánto vale tu propiedad?</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Obtén una valoración gratuita de tu propiedad en menos de 5 minutos. Nuestro algoritmo avanzado utiliza datos del mercado inmobiliario actual para darte una estimación precisa.
          </p>
        </div>
        
        {enviado ? (
          <div className="bg-white shadow-lg rounded-lg p-8 mb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Solicitud enviada con éxito!</h2>
            <p className="text-gray-600 mb-6">
              Gracias por solicitar la valoración de tu propiedad. Uno de nuestros expertos inmobiliarios analizará los datos proporcionados y te contactará en un plazo máximo de 24 horas con una valoración detallada.
            </p>
            <Link to="/" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200">
              Volver al inicio
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Cabecera del formulario */}
            <div className="bg-blue-600 p-6">
              <div className="flex justify-between">
                <div className="flex space-x-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${etapa === 1 ? 'bg-white text-blue-600' : 'bg-blue-200 text-blue-800'} font-semibold`}>1</div>
                  <div className={`hidden sm:block ${etapa === 1 ? 'text-white' : 'text-blue-200'} font-semibold`}>Datos de la propiedad</div>
                </div>
                <div className="border-t-2 border-blue-400 flex-grow mx-4 mt-4 hidden sm:block"></div>
                <div className="flex space-x-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${etapa === 2 ? 'bg-white text-blue-600' : 'bg-blue-300 text-blue-800'} font-semibold`}>2</div>
                  <div className={`hidden sm:block ${etapa === 2 ? 'text-white' : 'text-blue-200'} font-semibold`}>Información de contacto</div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              {etapa === 1 ? (
                <form onSubmit={irSiguienteEtapa}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Datos de tu propiedad</h2>
                  
                  <div className="mb-4">
                    <label htmlFor="direccion" className="block text-gray-700 font-medium mb-2">Dirección completa *</label>
                    <input
                      type="text"
                      id="direccion"
                      name="direccion"
                      placeholder="Calle, número, piso, código postal, ciudad"
                      value={formData.direccion}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label htmlFor="tipo" className="block text-gray-700 font-medium mb-2">Tipo de inmueble *</label>
                      <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="piso">Piso</option>
                        <option value="casa">Casa / Chalet</option>
                        <option value="atico">Ático</option>
                        <option value="duplex">Dúplex</option>
                        <option value="estudio">Estudio</option>
                        <option value="local">Local comercial</option>
                        <option value="oficina">Oficina</option>
                        <option value="terreno">Terreno</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="metros" className="block text-gray-700 font-medium mb-2">Metros cuadrados *</label>
                      <input
                        type="number"
                        id="metros"
                        name="metros"
                        placeholder="m²"
                        value={formData.metros}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                        min="1"
                      />
                    </div>
                    <div>
                      <label htmlFor="antiguedad" className="block text-gray-700 font-medium mb-2">Antigüedad (años) *</label>
                      <select
                        id="antiguedad"
                        name="antiguedad"
                        value={formData.antiguedad}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="nuevo">Obra nueva</option>
                        <option value="1-5">1-5 años</option>
                        <option value="6-10">6-10 años</option>
                        <option value="11-20">11-20 años</option>
                        <option value="21-30">21-30 años</option>
                        <option value="31+">Más de 30 años</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label htmlFor="habitaciones" className="block text-gray-700 font-medium mb-2">Habitaciones *</label>
                      <select
                        id="habitaciones"
                        name="habitaciones"
                        value={formData.habitaciones}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="0">Estudio (0)</option>
                        <option value="1">1 habitación</option>
                        <option value="2">2 habitaciones</option>
                        <option value="3">3 habitaciones</option>
                        <option value="4">4 habitaciones</option>
                        <option value="5+">5 o más</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="banos" className="block text-gray-700 font-medium mb-2">Baños *</label>
                      <select
                        id="banos"
                        name="banos"
                        value={formData.banos}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="1">1 baño</option>
                        <option value="2">2 baños</option>
                        <option value="3">3 baños</option>
                        <option value="4+">4 o más</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="estado" className="block text-gray-700 font-medium mb-2">Estado *</label>
                      <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      >
                        <option value="">Seleccionar</option>
                        <option value="nuevo">A estrenar</option>
                        <option value="bueno">Buen estado</option>
                        <option value="reformar">A reformar</option>
                        <option value="reformado">Reformado</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Características adicionales</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="terraza"
                          name="extras"
                          value="terraza"
                          checked={formData.extras.includes('terraza')}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terraza" className="ml-2 block text-sm text-gray-700">Terraza</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="piscina"
                          name="extras"
                          value="piscina"
                          checked={formData.extras.includes('piscina')}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="piscina" className="ml-2 block text-sm text-gray-700">Piscina</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="jardin"
                          name="extras"
                          value="jardin"
                          checked={formData.extras.includes('jardin')}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="jardin" className="ml-2 block text-sm text-gray-700">Jardín</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="garaje"
                          name="extras"
                          value="garaje"
                          checked={formData.extras.includes('garaje')}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="garaje" className="ml-2 block text-sm text-gray-700">Garaje</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="ascensor"
                          name="extras"
                          value="ascensor"
                          checked={formData.extras.includes('ascensor')}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="ascensor" className="ml-2 block text-sm text-gray-700">Ascensor</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="trastero"
                          name="extras"
                          value="trastero"
                          checked={formData.extras.includes('trastero')}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="trastero" className="ml-2 block text-sm text-gray-700">Trastero</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                    >
                      Siguiente
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Tus datos de contacto</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                  </div>
                  
                  <div className="mb-6">
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
                  
                  <div className="flex items-center mb-6">
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
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={irEtapaAnterior}
                      className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                      Anterior
                    </button>
                    
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                    >
                      Solicitar valoración
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
        
        {/* Información adicional */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Valoración precisa</h3>
            <p className="text-gray-600">Utilizamos algoritmos avanzados y datos del mercado actual para ofrecerte la valoración más precisa posible.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Respuesta rápida</h3>
            <p className="text-gray-600">Te enviaremos la valoración de tu propiedad en un plazo máximo de 24 horas.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Asesoramiento personalizado</h3>
            <p className="text-gray-600">Un experto inmobiliario te contactará para explicarte la valoración y resolver todas tus dudas.</p>
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

export default ValoraTuCasa; 