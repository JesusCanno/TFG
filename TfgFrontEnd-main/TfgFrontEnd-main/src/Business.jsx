import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navigateToHome } from "./general";
import { businessService } from './services';
import authService from "./services/authService";

const Business = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    businessType: "",
    employees: "",
    description: "",
    services: []
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter(service => service !== value)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await businessService.sendBusinessRequest(formData);
      setMessage("Formulario enviado correctamente. Nos pondremos en contacto contigo pronto.");
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        businessType: "",
        employees: "",
        description: "",
        services: []
      });
    } catch (error) {
      setMessage("Hubo un error al enviar la solicitud. Inténtalo de nuevo más tarde.");
    }
    setTimeout(() => {
      setMessage("");
    }, 5000);
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
          {authService.getUserRole() !== 'admin' && (
            <Link to="/business" className="text-blue-600 font-medium">¿Eres un negocio?</Link>
          )}
          <Link to="/account" className="text-gray-600 hover:text-blue-600">Mi cuenta</Link>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow">
        {/* Banner de negocios */}
        <section className="bg-blue-800 text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Soluciones inmobiliarias para empresas</h1>
            <p className="text-xl mb-8">Potencia tu negocio con nuestros servicios exclusivos para empresas y profesionales del sector.</p>
          </div>
        </section>

        {/* Beneficios para empresas */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">¿Por qué elegir Vivius Business?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Cuenta empresarial</h3>
                <p className="text-gray-600">Acceso a un panel exclusivo para gestionar tus propiedades y clientes de forma eficiente.</p>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Verificación especial</h3>
                <p className="text-gray-600">Tu empresa aparecerá con una insignia de verificación que aumenta la confianza de los usuarios.</p>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Estadísticas avanzadas</h3>
                <p className="text-gray-600">Informes detallados sobre el rendimiento de tus anuncios y el interés de los clientes.</p>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Posicionamiento preferente</h3>
                <p className="text-gray-600">Tus propiedades aparecerán en posiciones destacadas en los resultados de búsqueda.</p>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Publicación ilimitada</h3>
                <p className="text-gray-600">Sin restricciones en el número de propiedades que puedes publicar en nuestra plataforma.</p>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Soporte prioritario</h3>
                <p className="text-gray-600">Atención personalizada por parte de nuestro equipo de soporte especializado.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solicitud de cuenta empresarial */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Solicita tu cuenta empresarial</h2>
            <p className="text-gray-600 text-center mb-10">Completa el siguiente formulario y nuestro equipo evaluará tu solicitud. Te contactaremos en un plazo máximo de 48 horas hábiles.</p>

            {message && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <p className="text-green-700">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-6">
                <label htmlFor="companyName" className="block text-gray-700 font-medium mb-2">Nombre de la empresa*</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="contactPerson" className="block text-gray-700 font-medium mb-2">Persona de contacto*</label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email de contacto*</label>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Teléfono*</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="businessType" className="block text-gray-700 font-medium mb-2">Tipo de negocio*</label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  >
                    <option value="">Seleccionar...</option>
                    <option value="inmobiliaria">Inmobiliaria</option>
                    <option value="constructora">Constructora</option>
                    <option value="administradorFincas">Administrador de fincas</option>
                    <option value="agenteIndependiente">Agente independiente</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="employees" className="block text-gray-700 font-medium mb-2">Número de empleados</label>
                <select
                  id="employees"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Seleccionar...</option>
                  <option value="1-5">1-5 empleados</option>
                  <option value="6-10">6-10 empleados</option>
                  <option value="11-20">11-20 empleados</option>
                  <option value="21-50">21-50 empleados</option>
                  <option value="50+">Más de 50 empleados</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Breve descripción de tu empresa</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>

              <div className="mb-6">
                <p className="block text-gray-700 font-medium mb-2">Servicios que ofreces</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="compraventa"
                      name="services"
                      value="compraventa"
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="compraventa" className="ml-2 block text-sm text-gray-700">Compraventa de inmuebles</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="alquiler"
                      name="services"
                      value="alquiler"
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="alquiler" className="ml-2 block text-sm text-gray-700">Alquiler de propiedades</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="tasacion"
                      name="services"
                      value="tasacion"
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="tasacion" className="ml-2 block text-sm text-gray-700">Tasación de inmuebles</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="reforma"
                      name="services"
                      value="reforma"
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="reforma" className="ml-2 block text-sm text-gray-700">Reformas y construcción</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="gestion"
                      name="services"
                      value="gestion"
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="gestion" className="ml-2 block text-sm text-gray-700">Gestión de propiedades</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="asesoria"
                      name="services"
                      value="asesoria"
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="asesoria" className="ml-2 block text-sm text-gray-700">Asesoramiento legal</label>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="privacy"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                  He leído y acepto la <Link to="/legal" className="text-blue-600 hover:underline">política de privacidad</Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Enviar solicitud
              </button>
            </form>
          </div>
        </section>
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

export default Business;
