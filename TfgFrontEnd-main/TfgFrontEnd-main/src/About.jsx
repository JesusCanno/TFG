import React from "react";
import { Link } from "react-router-dom";
import { navigateToHome } from "./general";

const About = () => {
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
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-6">Conócenos</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Somos Vivius, mucho más que una inmobiliaria. Descubre nuestra historia, valores y el equipo que hace posible ofrecer el mejor servicio inmobiliario.
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto p-6 my-12">
        {/* Nuestra historia */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestra Historia</h2>
              <p className="text-gray-600 mb-4">
                Fundada en 2010, Vivius nació con la visión de transformar el sector inmobiliario en España, ofreciendo un servicio transparente, personalizado y de alta calidad.
              </p>
              <p className="text-gray-600 mb-4">
                Lo que comenzó como una pequeña oficina en el centro de Madrid con un equipo de tres personas, se ha convertido en una red de agencias inmobiliarias con presencia en las principales ciudades españolas.
              </p>
              <p className="text-gray-600">
                Nuestra filosofía siempre ha sido clara: poner a las personas en el centro de cada operación inmobiliaria, entendiendo que la compra, venta o alquiler de una propiedad es una de las decisiones más importantes en la vida.
              </p>
            </div>
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 italic">Imagen de la sede principal</p>
            </div>
          </div>
        </section>
        
        {/* Misión, Visión y Valores */}
        <section className="mb-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Misión, Visión y Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Misión</h3>
              <p className="text-gray-600">
                Facilitar a nuestros clientes la mejor experiencia inmobiliaria, ofreciendo un servicio integral y personalizado, y contribuyendo a que encuentren la vivienda que mejor se adapte a sus necesidades.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Visión</h3>
              <p className="text-gray-600">
                Convertirnos en la referencia del sector inmobiliario en España, siendo reconocidos por nuestra excelencia, profesionalidad y compromiso con la innovación y la satisfacción del cliente.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Valores</h3>
              <p className="text-gray-600">
                Transparencia, profesionalidad, compromiso, innovación y cercanía son los pilares fundamentales que guían todas nuestras acciones y relaciones con clientes, colaboradores y proveedores.
              </p>
            </div>
          </div>
        </section>
        
        {/* Equipo directivo */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nuestro Equipo Directivo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <p className="text-gray-500 italic flex items-center justify-center h-full">Foto</p>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Carlos Martínez</h3>
              <p className="text-blue-600 mb-3">CEO y Fundador</p>
              <p className="text-gray-600">
                Con más de 20 años de experiencia en el sector inmobiliario, Carlos fundó Vivius con la visión de ofrecer un servicio inmobiliario diferente.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <p className="text-gray-500 italic flex items-center justify-center h-full">Foto</p>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Laura Sánchez</h3>
              <p className="text-blue-600 mb-3">Directora de Operaciones</p>
              <p className="text-gray-600">
                Laura supervisa todas las operaciones de Vivius, asegurando la excelencia en el servicio y la satisfacción de nuestros clientes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <p className="text-gray-500 italic flex items-center justify-center h-full">Foto</p>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Miguel Fernández</h3>
              <p className="text-blue-600 mb-3">Director de Expansión</p>
              <p className="text-gray-600">
                Miguel lidera la estrategia de crecimiento y expansión de Vivius, desarrollando la red de franquicias y nuevas oficinas.
              </p>
            </div>
          </div>
        </section>
        
        {/* Datos y cifras */}
        <section className="mb-16 bg-blue-600 text-white p-10 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Vivius en cifras</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">+5,000</div>
              <div className="text-lg">Propiedades vendidas</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-lg">Oficinas en España</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">+200</div>
              <div className="text-lg">Profesionales</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold mb-2">97%</div>
              <div className="text-lg">Clientes satisfechos</div>
            </div>
          </div>
        </section>
        
        {/* Responsabilidad social */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 italic">Imagen de proyecto social</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Responsabilidad Social</h2>
              <p className="text-gray-600 mb-4">
                En Vivius creemos firmemente en devolver a la sociedad parte de lo que nos ha dado. Por ello, desarrollamos diversos programas de responsabilidad social corporativa.
              </p>
              <p className="text-gray-600 mb-4">
                Nuestro programa "Hogar para Todos" colabora con ONG's locales para mejorar el acceso a la vivienda de colectivos vulnerables, y dedicamos el 1% de nuestros beneficios anuales a proyectos sociales y medioambientales.
              </p>
              <p className="text-gray-600">
                Además, fomentamos la construcción sostenible y la eficiencia energética en todas las propiedades que comercializamos, contribuyendo a un futuro más verde.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-gray-100 p-10 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Quieres formar parte de Vivius?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Si compartes nuestros valores y te apasiona el sector inmobiliario, explora nuestras oportunidades profesionales o descubre cómo unirte a nuestra red de franquicias.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/trabaja-con-nosotros" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200">
              Únete a nuestro equipo
            </Link>
            <Link to="/franquicia" className="bg-white text-blue-600 border border-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition duration-200">
              Abre tu franquicia
            </Link>
          </div>
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

export default About; 