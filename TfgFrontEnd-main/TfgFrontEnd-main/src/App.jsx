import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { filterApartments } from './filters'; // Importamos la función de filtrado
import { navigateToHome } from './general'; // Importamos la función para redirigir a la página principal
import propertyService from './services/fixed-propertyService'; // Importamos la versión corregida del servicio
import authService from './services/authService';
import "./App.css";
import { getImageUrl } from './config';

const App = () => {
  const navigate = useNavigate();
  const [apartments, setApartments] = useState([]);
  const [filters, setFilters] = useState({
    tipoInmueble: "",
    precioMin: 0,
    precioMax: 2000000,
    metrosMin: 0,
    metrosMax: 500,
    habitacionesMin: 1,
    habitacionesMax: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Verificar si hay una sesión activa
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      setUserRole(authService.getUserRole());
      // Cargar favoritos del usuario
      const userFavorites = localStorage.getItem('favorites');
      if (userFavorites) {
        setFavorites(JSON.parse(userFavorites));
      }
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, []);

  useEffect(() => {
    console.log("Cargando propiedades desde API...");
    propertyService.getProperties()
      .then((data) => {
        console.log("Datos recibidos de la API de inmuebles:", data);
        console.log("Tipo de datos recibidos:", typeof data);
        console.log("¿Es un array?", Array.isArray(data));
        if (data && data.length > 0) {
          console.log("Primer inmueble:", data[0]);
        } else {
          console.log("No se recibieron inmuebles o el array está vacío");
        }
        setApartments(data);
        setFilteredApartments(data);
      })
      .catch((error) => {
        console.error("Error al cargar inmuebles:", error);
        setApartments([]);
        setFilteredApartments([]);
      });
  }, []);

  // Efecto para filtrar automáticamente al escribir
  useEffect(() => {
    console.log("Aplicando filtros:", { filters, searchTerm });
    const filtered = filterApartments(apartments, filters, searchTerm);
    console.log("Apartamentos filtrados:", filtered);
    setFilteredApartments(filtered);
  }, [searchTerm, apartments, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleFavorite = (apartment) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    const currentFavorites = [...favorites];
    const index = currentFavorites.findIndex(fav => fav.id === apartment.id);
    
    if (index !== -1) {
      // Eliminar de favoritos
      currentFavorites.splice(index, 1);
    } else {
      // Añadir a favoritos
      currentFavorites.push(apartment);
    }
    
    setFavorites(currentFavorites);
    localStorage.setItem('favorites', JSON.stringify(currentFavorites));
  };

  const isFavorite = (id) => {
    return favorites.some(fav => fav.id === id);
  };

  const redirectToLogin = () => {
    setShowLoginModal(false);
    navigate('/login');
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Barra de presentación superior */}
      <section className="bg-blue-600 text-white p-3">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div>
            <Link to="/vende-tu-piso" className="hover:underline">Vende tu piso</Link>
            <Link to="/oficinas" className="ml-6 hover:underline">Oficinas</Link>
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
        <div className="flex flex-grow items-center justify-center">
          <input
            type="text"
            placeholder="Buscar por nombre de vivienda..."
            className="w-1/2 p-3 rounded-lg border border-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-6">
          <Link to="/business" className="text-gray-600 hover:text-blue-600">¿Eres un negocio?</Link>
          {isLoggedIn && userRole === 'negocio' && (
            <Link to="/business-dashboard" className="text-gray-600 hover:text-blue-600 font-medium">
              Panel de negocio
            </Link>
          )}
          {isLoggedIn ? (
            <Link to="/account" className="text-gray-600 hover:text-blue-600">Mi cuenta</Link>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-blue-600">Iniciar sesión</Link>
          )}
        </div>
      </header>

      {/* Div con fondo de imagen */}
      <div className="bg-cover bg-center h-80" style={{ background : `url(/casa.jpg)` }}></div>

      <div className="flex flex-row">
        {/* Sección de filtros - Ahora en posición fija en la columna izquierda */}
        <aside className="w-1/5 p-6">
          <div className="bg-white shadow-lg p-6 rounded-md sticky top-24">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Filtrar búsqueda</h3>
            <form>
              {/* Filtro de tipo de inmueble */}
              <div className="mb-4">
                <label htmlFor="tipoInmueble" className="block text-gray-700">Tipo de inmueble</label>
                <select
                  id="tipoInmueble"
                  name="tipoInmueble"
                  className="w-full p-3 rounded-lg border border-gray-300"
                  value={filters.tipoInmueble}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  <option value="piso">Piso</option>
                  <option value="casa">Casa</option>
                  <option value="local">Local</option>
                  <option value="terreno">Terreno</option>
                </select>
              </div>

              {/* Filtro de precio */}
              <div className="mb-4">
                <label className="block text-gray-700">Precio de los inmuebles</label>
                <div className="flex justify-between space-x-2">
                  <select
                    id="precioMin"
                    name="precioMin"
                    className="w-1/2 p-3 rounded-lg border border-gray-300"
                    value={filters.precioMin}
                    onChange={handleFilterChange}
                  >
                    <option value="0">0 €</option>
                    <option value="50000">50,000 €</option>
                    <option value="100000">100,000 €</option>
                    <option value="200000">200,000 €</option>
                    <option value="500000">500,000 €</option>
                    <option value="1000000">1,000,000 €</option>
                  </select>
                  <select
                    id="precioMax"
                    name="precioMax"
                    className="w-1/2 p-3 rounded-lg border border-gray-300"
                    value={filters.precioMax}
                    onChange={handleFilterChange}
                  >
                    <option value="50000">50,000 €</option>
                    <option value="100000">100,000 €</option>
                    <option value="200000">200,000 €</option>
                    <option value="500000">500,000 €</option>
                    <option value="1000000">1,000,000 €</option>
                    <option value="2000000">2,000,000 €</option>
                  </select>
                </div>
              </div>

              {/* Filtro de metros cuadrados */}
              <div className="mb-4">
                <label className="block text-gray-700">Metros cuadrados</label>
                <div className="flex justify-between space-x-2">
                  <select
                    id="metrosMin"
                    name="metrosMin"
                    className="w-1/2 p-3 rounded-lg border border-gray-300"
                    value={filters.metrosMin}
                    onChange={handleFilterChange}
                  >
                    <option value="0">0 m²</option>
                    <option value="50">50 m²</option>
                    <option value="100">100 m²</option>
                    <option value="150">150 m²</option>
                    <option value="200">200 m²</option>
                    <option value="500">500 m²</option>
                  </select>
                  <select
                    id="metrosMax"
                    name="metrosMax"
                    className="w-1/2 p-3 rounded-lg border border-gray-300"
                    value={filters.metrosMax}
                    onChange={handleFilterChange}
                  >
                    <option value="50">50 m²</option>
                    <option value="100">100 m²</option>
                    <option value="150">150 m²</option>
                    <option value="200">200 m²</option>
                    <option value="300">300 m²</option>
                    <option value="500">500 m²</option>
                  </select>
                </div>
              </div>

              {/* Filtro de habitaciones */}
              <div className="mb-4">
                <label className="block text-gray-700">Habitaciones</label>
                <div className="flex justify-between space-x-2">
                  <select
                    id="habitacionesMin"
                    name="habitacionesMin"
                    className="w-1/2 p-3 rounded-lg border border-gray-300"
                    value={filters.habitacionesMin}
                    onChange={handleFilterChange}
                  >
                    <option value="1">1 habitación</option>
                    <option value="2">2 habitaciones</option>
                    <option value="3">3 habitaciones</option>
                    <option value="4">4 habitaciones</option>
                    <option value="5">5 habitaciones</option>
                    <option value="6">6 habitaciones</option>
                  </select>
                  <select
                    id="habitacionesMax"
                    name="habitacionesMax"
                    className="w-1/2 p-3 rounded-lg border border-gray-300"
                    value={filters.habitacionesMax}
                    onChange={handleFilterChange}
                  >
                    <option value="1">1 habitación</option>
                    <option value="2">2 habitaciones</option>
                    <option value="3">3 habitaciones</option>
                    <option value="4">4 habitaciones</option>
                    <option value="5">5 habitaciones</option>
                    <option value="6">6 habitaciones</option>
                    <option value="8">8 habitaciones</option>
                    <option value="10">10 habitaciones</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </aside>

        {/* Listado de propiedades */}
        <main className="w-4/5">
          <section className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-8 p-8">
            {filteredApartments.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 py-20">
                <p className="text-xl">No se encontraron viviendas con los criterios seleccionados.</p>
                <p className="mt-2">Prueba a cambiar los filtros de búsqueda.</p>
              </div>
            ) : (
              filteredApartments.map((apartment) => (
                <div
                  key={apartment.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row mx-auto mb-8"
                  style={{ width: "100%" }}
                >
                  {/* Imagen del apartamento */}
                  <div
                    className="w-full h-full sm:w-1/3 h-48 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${getImageUrl(apartment.foto)})` 
                    }}
                  ></div>

                  {/* Detalles del apartamento */}
                  <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
                    {/* Título y botón de favoritos */}
                    <div className="flex justify-between items-center">
                      <Link to={`/inmueble/${apartment.id}`} className="text-xl font-semibold text-gray-800 hover:underline">
                        {apartment.titulo}
                      </Link>
                      <button 
                        onClick={() => toggleFavorite(apartment)}
                        className="text-2xl focus:outline-none"
                        aria-label={isFavorite(apartment.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
                      >
                        {isFavorite(apartment.id) ? 
                          <span className="text-red-500">❤</span> : 
                          <span className="text-gray-400">♡</span>
                        }
                      </button>
                    </div>

                    {/* Recubrimiento de precio, metros y habitaciones */}
                    <div className="flex justify-between mt-4">
                      <div className="w-1/3 p-2 m-2 bg-gray-200 rounded-lg text-center">
                        <span className="font-semibold text-gray-700">Precio</span>
                        <p className="text-lg font-semibold">{apartment.precio} €</p>
                      </div>
                      <div className="w-1/3 p-2 m-2 bg-gray-200 rounded-lg text-center">
                        <span className="font-semibold text-gray-700">Metros</span>
                        <p className="text-lg font-semibold">{apartment.metro} m²</p>
                      </div>
                      <div className="w-1/3 p-2 m-2 bg-gray-200 rounded-lg text-center">
                        <span className="font-semibold text-gray-700">Habitaciones</span>
                        <p className="text-lg font-semibold">{apartment.habitacion}</p>
                      </div>
                    </div>

                    {/* Dirección y botón */}
                    <div className="flex items-center mt-4">
                      <p className="text-gray-600">{apartment.direccion}</p>
                      <button className="ml-4 bg-blue-500 text-white p-2 rounded-full flex items-center justify-center">
                        <i className="fas fa-map-marker-alt">Ver en el mapa</i>
                      </button>
                    </div>

                    {/* Tipo de propiedad y operación */}
                    <div className="mt-4">
                      <span className="text-gray-700 font-semibold">Tipo: </span>
                      <span className="text-gray-600">{apartment.tipo}</span>
                      <span className="text-gray-700 font-semibold ml-4">Operación: </span>
                      <span className="text-gray-600">{apartment.operacion}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </main>
      </div>

      {/* Modal para login */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Inicia sesión para continuar</h3>
            <p className="text-gray-600 mb-6">Para añadir propiedades a tus favoritos, necesitas iniciar sesión o crear una cuenta.</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowLoginModal(false)} 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button 
                onClick={redirectToLogin} 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pie de página */}
      <footer className="bg-blue-600 text-white py-4 mt-8">
        <ul className="flex justify-center space-x-6">
          <li><Link to="/legal" className="hover:text-yellow-300">Aviso Legal</Link></li>
          <li><Link to="/about" className="hover:text-yellow-300">Conócenos</Link></li>
          <li><Link to="/contacto" className="hover:text-yellow-300">Contacto</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default App;
