import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertyService from './services/propertyService';
import { getImageUrl } from './config';
import authService from './services/authService';
import { navigateToHome } from './general';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState({ nombre: '', email: '', mensaje: '', telefono: '' });
  const [contactSuccess, setContactSuccess] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxDescriptionLength = 200;

  useEffect(() => {
    propertyService.getPropertyById(id)
      .then(setProperty)
      .catch(() => setError('No se pudo cargar el inmueble'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      const user = authService.getCurrentUser();
      setContact((prev) => ({
        ...prev,
        nombre: user?.name || '',
        email: user?.email || ''
      }));
    }
  }, []);

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!property) return;
    try {
      await propertyService.requestInfo(property.id, {
        inmueble_id: property.id,
        propietario_id: property.user_id,
        nombre: contact.nombre,
        email: contact.email,
        telefono: contact.telefono,
        mensaje: contact.mensaje
      });
      setContactSuccess('¡Mensaje enviado correctamente!');
      setContact({ nombre: '', email: '', mensaje: '', telefono: '' });
    } catch {
      setContactSuccess('Error al enviar el mensaje');
    }
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!property) return null;

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

      {/* Cabecera */}
      <header className="flex justify-between items-center p-5 bg-white shadow-md" style={{ height: '90px' }}>
        <div className="flex items-center space-x-3 ml-6" onClick={navigateToHome}>
          <Link to="/">
            <img src="/sinFondo.png" alt="Logo" className="w-28 h-auto" />
          </Link>
        </div>
        <div className="flex space-x-6">
          {authService.getUserRole && authService.getUserRole() !== 'admin' && authService.getUserRole() !== 'negocio' && (
            <Link to="/business" className="text-gray-600 hover:text-blue-600">¿Eres un negocio?</Link>
          )}
          <Link to="/account" className="text-gray-600 hover:text-blue-600">Mi cuenta</Link>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 max-w-5xl mx-auto p-6 my-10 w-full">
        <Link to="/" className="text-blue-600 hover:underline flex items-center mb-4">&larr; Volver al listado</Link>
        <div className="bg-white shadow-lg rounded-lg p-0 md:p-8 flex flex-col md:flex-row gap-0 md:gap-8">
          {/* Imagen principal */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <img src={getImageUrl(property.foto)} alt={property.titulo} className="w-full h-80 object-cover rounded-t-lg md:rounded-lg" />
            <div className="flex flex-wrap gap-2 mt-2">
              {/* Aquí podrías mostrar más imágenes si las hubiera */}
            </div>
          </div>
          {/* Info principal */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-600 mb-2">{property.titulo}</h1>
              <p className="text-gray-600 mb-2 text-lg">{property.direccion}</p>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-blue-50 text-blue-700 px-5 py-3 rounded-xl font-semibold text-lg shadow-sm">
                  {property.precio} €
                </span>
                <span className="bg-blue-50 text-blue-700 px-5 py-3 rounded-xl font-semibold text-lg shadow-sm">
                  {property.metro} m²
                </span>
                <span className="bg-blue-50 text-blue-700 px-5 py-3 rounded-xl font-semibold text-lg shadow-sm">
                  {property.habitacion} hab.
                </span>
                <span className="bg-blue-50 text-blue-700 px-5 py-3 rounded-xl font-semibold text-lg shadow-sm capitalize">
                  {property.tipo}
                </span>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-gray-700">Descripción:</span>
                <p className="text-gray-600 mt-1 whitespace-pre-line break-words">
                  {property.descripcion && property.descripcion.length > maxDescriptionLength && !showFullDescription
                    ? (
                        <>
                          {property.descripcion.slice(0, maxDescriptionLength)}...
                          <button
                            className="text-blue-600 ml-2 hover:underline text-sm"
                            type="button"
                            onClick={() => setShowFullDescription(true)}
                          >
                            Ver más
                          </button>
                        </>
                      )
                    : property.descripcion
                  }
                  {property.descripcion && property.descripcion.length > maxDescriptionLength && showFullDescription && (
                    <button
                      className="text-blue-600 ml-2 hover:underline text-sm"
                      type="button"
                      onClick={() => setShowFullDescription(false)}
                    >
                      Ver menos
                    </button>
                  )}
                </p>
              </div>
            </div>
            {/* Formulario de contacto */}
            <form onSubmit={handleContactSubmit} className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2 text-blue-600">Contactar sobre este inmueble</h2>
              {contactSuccess && <div className="mb-2 text-green-600">{contactSuccess}</div>}
              <input type="text" name="nombre" value={contact.nombre} onChange={handleContactChange} placeholder="Tu nombre" className="w-full mb-2 p-2 border rounded" required />
              <input type="email" name="email" value={contact.email} onChange={handleContactChange} placeholder="Tu email" className="w-full mb-2 p-2 border rounded" required />
              <input type="tel" name="telefono" value={contact.telefono} onChange={handleContactChange} placeholder="Tu teléfono (opcional)" className="w-full mb-2 p-2 border rounded" />
              <textarea name="mensaje" value={contact.mensaje} onChange={handleContactChange} placeholder="Mensaje" className="w-full mb-2 p-2 border rounded" required />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enviar mensaje</button>
            </form>
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

export default PropertyDetail; 