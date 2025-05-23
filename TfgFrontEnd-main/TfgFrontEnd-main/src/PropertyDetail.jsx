import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertyService from './services/propertyService';
import { getImageUrl } from './config';
import authService from './services/authService';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState({ nombre: '', email: '', mensaje: '', telefono: '' });
  const [contactSuccess, setContactSuccess] = useState('');

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
    <div className="max-w-4xl mx-auto p-8">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Volver al listado</Link>
      <div className="bg-white shadow-lg rounded-lg mt-4 p-6 flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img src={getImageUrl(property.foto)} alt={property.nombre} className="w-full rounded-lg" />
        </div>
        <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
          <h1 className="text-2xl font-bold mb-2">{property.nombre}</h1>
          <p className="text-gray-600 mb-2">{property.ubicacion}</p>
          <div className="flex space-x-4 mb-4">
            <span className="bg-gray-100 px-3 py-1 rounded">Precio: <b>{property.precio} €</b></span>
            <span className="bg-gray-100 px-3 py-1 rounded">Metros: <b>{property.area} m²</b></span>
            <span className="bg-gray-100 px-3 py-1 rounded">Habitaciones: <b>{property.habitaciones}</b></span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Tipo:</span> {property.tipo}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Descripción:</span> {property.descripcion || 'Sin descripción.'}
          </div>
          <form onSubmit={handleContactSubmit} className="mt-6 bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Contactar sobre este inmueble</h2>
            {contactSuccess && <div className="mb-2 text-green-600">{contactSuccess}</div>}
            <input type="text" name="nombre" value={contact.nombre} onChange={handleContactChange} placeholder="Tu nombre" className="w-full mb-2 p-2 border rounded" required />
            <input type="email" name="email" value={contact.email} onChange={handleContactChange} placeholder="Tu email" className="w-full mb-2 p-2 border rounded" required />
            <input type="tel" name="telefono" value={contact.telefono} onChange={handleContactChange} placeholder="Tu teléfono (opcional)" className="w-full mb-2 p-2 border rounded" />
            <textarea name="mensaje" value={contact.mensaje} onChange={handleContactChange} placeholder="Mensaje" className="w-full mb-2 p-2 border rounded" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enviar mensaje</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail; 