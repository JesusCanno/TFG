import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navigateToHome } from "./general";
import propertyService from './services/propertyService';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    propertyService.getFavorites()
      .then(setFavorites)
      .catch(() => setFavorites([]));
  }, [navigate]);

  const removeFavorite = async (id) => {
    try {
      await propertyService.removeFromFavorites(id);
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (error) {
      // Manejo de error
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
      <main className="flex-grow p-6 my-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-6">
              <h1 className="text-2xl font-bold">Mis Favoritos</h1>
              <p className="mt-1">Propiedades que has guardado como favoritas</p>
            </div>
            
            <div className="p-6">
              {/* Contenido principal */}
              <div className="w-full">
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-700 mt-4">No tienes propiedades favoritas</h2>
                    <p className="text-gray-500 mt-2">Explora propiedades y guárdalas como favoritas para verlas aquí</p>
                    <Link to="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Explorar propiedades
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map((property) => (
                      <div key={property.id} className="bg-white border rounded-lg shadow-sm overflow-hidden flex">
                        {/* Imagen del apartamento */}
                        <div
                          className="w-1/3 h-40 bg-cover bg-center"
                          style={{ backgroundImage: `url(${property.foto})` }}
                        ></div>
                        
                        {/* Detalles del apartamento */}
                        <div className="w-2/3 p-4 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-800">{property.nombre}</h3>
                              <button 
                                onClick={() => removeFavorite(property.id)} 
                                className="text-red-500 hover:text-red-700"
                                aria-label="Eliminar de favoritos"
                              >
                                <span className="text-xl">❤</span>
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{property.ubicacion}</p>
                          </div>
                          
                          <div className="mt-4 flex justify-between text-sm">
                            <div>
                              <span className="font-medium text-gray-700">{property.precio}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">{property.area} | {property.habitaciones} hab.</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Ver detalles
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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

export default Favorites; 