import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import propertyService from './services/fixed-propertyService';
import authService from './services/authService';
import { navigateToHome } from './general';

const PropertyForm = ({ isEditing = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    metro: '',
    habitacion: '',
    direccion: '',
    tipo: 'piso',
    operacion: 'venta',
    activo: true,
    destacado: false,
    foto: null,
    // Los campos adicionales se pueden añadir aquí
  });

  // Estado para mostrar la vista previa de la imagen
  const [imagePreview, setImagePreview] = useState(null);

  // Añadir estado para errores de validación de campos
  const [fieldErrors, setFieldErrors] = useState({});

  // Verificar autenticación y cargar datos de la propiedad si estamos editando
  useEffect(() => {
    const checkAuth = async () => {
      if (!authService.isAuthenticated()) {
        navigate('/login');
        return;
      }

      const currentUser = authService.getCurrentUser();
      if (!currentUser || currentUser.rol !== 'negocio') {
        navigate('/');
        return;
      }

      if (isEditing && id) {
        try {
          setLoading(true);
          const property = await propertyService.getPropertyById(id);
          if (property) {
            // Convertir los valores a string para el formulario
            setFormData({
              titulo: property.titulo || '',
              descripcion: property.descripcion || '',
              precio: property.precio?.toString() || '',
              metro: property.metro?.toString() || '',
              habitacion: property.habitacion?.toString() || '',
              direccion: property.direccion || '',
              tipo: property.tipo || 'piso',
              operacion: property.operacion || 'venta',
              activo: property.activo !== false, // Por defecto activo
              destacado: property.destacado !== false,
              foto: null // La foto se maneja de forma especial
            });

            // Si hay una foto existente, mostrar la vista previa
            if (property.foto) {
              setImagePreview(`http://127.0.0.1:8000${property.foto}`);
            }
          }
        } catch (err) {
          console.error('Error al cargar la propiedad:', err);
          setError('No se pudo cargar la información de la propiedad');
        } finally {
          setLoading(false);
        }
      }
    };

    checkAuth();
  }, [id, isEditing, navigate]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejar subida de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        foto: file
      }));

      // Crear vista previa
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    // Validaciones frontend
    const newErrors = {};
    if (!formData.titulo || formData.titulo.length > 255) newErrors.titulo = 'El título es obligatorio y máximo 255 caracteres.';
    if (!formData.precio || isNaN(formData.precio) || Number(formData.precio) < 0 || Number(formData.precio) > 2000000) newErrors.precio = 'El precio debe ser un número entre 0 y 2.000.000.';
    if (!formData.metro || isNaN(formData.metro) || Number(formData.metro) < 0 || Number(formData.metro) > 1000) newErrors.metro = 'Los metros deben ser un número entre 0 y 1000.';
    if (!formData.habitacion || isNaN(formData.habitacion) || Number(formData.habitacion) < 0 || Number(formData.habitacion) > 20) newErrors.habitacion = 'Las habitaciones deben ser un número entre 0 y 20.';
    if (!formData.direccion) newErrors.direccion = 'La dirección es obligatoria.';
    if (!formData.descripcion) newErrors.descripcion = 'La descripción es obligatoria.';
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setSubmitting(false);
      return;
    }

    try {
      // Crear FormData para enviar archivos
      const formDataToSend = new FormData();
      // Solo los campos que espera el backend
      const campos = [
        'titulo', 'descripcion', 'precio', 'metro', 'habitacion', 'direccion', 'tipo', 'operacion', 'activo', 'destacado', 'foto'
      ];
      campos.forEach(key => {
        if (key === 'foto' && formData[key]) {
          formDataToSend.append('foto', formData[key]);
        } else if (key === 'activo' || key === 'destacado') {
          formDataToSend.append(key, formData[key] ? 1 : 0);
        } else if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });
      // Depuración: mostrar el contenido del FormData
      for (let pair of formDataToSend.entries()) {
        console.log('FormData:', pair[0], pair[1]);
      }
      // Enviar la solicitud según si estamos creando o editando
      if (isEditing) {
        await propertyService.updateProperty(id, formDataToSend);
        setSuccess(true);
        setTimeout(() => {
          navigate('/business-dashboard');
        }, 1500);
      } else {
        await propertyService.createProperty(formDataToSend);
        setSuccess(true);
        setTimeout(() => {
          navigate('/business-dashboard');
        }, 1500);
      }
    } catch (err) {
      console.error('Error al guardar la propiedad:', err);
      // Si hay error de validación de imagen
      if (err.response && err.response.data && err.response.data.errors && err.response.data.errors.foto) {
        setFieldErrors(prev => ({ ...prev, foto: err.response.data.errors.foto[0] }));
        setError('La imagen es demasiado grande o tiene un formato no permitido. Máximo 5MB.');
      } else {
        setError('Hubo un problema al guardar la propiedad. Por favor, revisa los datos e inténtalo de nuevo.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación */}
      <header className="flex justify-between items-center p-5 bg-white shadow-md" style={{ height: '90px' }}>
        <div className="flex items-center space-x-3 ml-6" onClick={navigateToHome}>
          <Link to="/">
            <img src="/sinFondo.png" alt="Logo" className="w-28 h-auto" />
          </Link>
        </div>
        <div className="flex space-x-6">
          <Link to="/business-dashboard" className="text-gray-600 hover:text-blue-600">
            Volver al panel
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? 'Editar propiedad' : 'Crear nueva propiedad'}
        </h1>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-700">
              {isEditing ? 'Propiedad actualizada con éxito' : 'Propiedad creada con éxito'}
            </p>
            <p className="text-sm text-green-600">Redirigiendo al panel de control...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                Título *
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {fieldErrors.titulo && <p className="text-red-600 text-sm mt-1">{fieldErrors.titulo}</p>}
            </div>

            <div>
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
                Precio (€) *
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                min="0"
                max="2000000"
              />
              {fieldErrors.precio && <p className="text-red-600 text-sm mt-1">{fieldErrors.precio}</p>}
            </div>

            <div>
              <label htmlFor="metro" className="block text-sm font-medium text-gray-700 mb-1">
                Metros cuadrados *
              </label>
              <input
                type="number"
                id="metro"
                name="metro"
                value={formData.metro}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                min="0"
                max="1000"
              />
              {fieldErrors.metro && <p className="text-red-600 text-sm mt-1">{fieldErrors.metro}</p>}
            </div>

            <div>
              <label htmlFor="habitacion" className="block text-sm font-medium text-gray-700 mb-1">
                Habitaciones *
              </label>
              <input
                type="number"
                id="habitacion"
                name="habitacion"
                value={formData.habitacion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                min="0"
                max="20"
              />
              {fieldErrors.habitacion && <p className="text-red-600 text-sm mt-1">{fieldErrors.habitacion}</p>}
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
              Dirección *
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {fieldErrors.direccion && <p className="text-red-600 text-sm mt-1">{fieldErrors.direccion}</p>}
          </div>

          {/* Tipo y operación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de inmueble *
              </label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="piso">Piso</option>
                <option value="casa">Casa</option>
                <option value="local">Local</option>
                <option value="terreno">Terreno</option>
              </select>
            </div>

            <div>
              <label htmlFor="operacion" className="block text-sm font-medium text-gray-700 mb-1">
                Operación *
              </label>
              <select
                id="operacion"
                name="operacion"
                value={formData.operacion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                id="activo"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="activo" className="ml-2 block text-sm text-gray-700">
                Propiedad visible (publicada)
              </label>
            </div>
            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                id="destacado"
                name="destacado"
                checked={formData.destacado}
                onChange={handleChange}
                className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-300 rounded ml-4"
              />
              <label htmlFor="destacado" className="ml-2 block text-sm text-gray-700">
                Inmueble destacado
              </label>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
            {fieldErrors.descripcion && <p className="text-red-600 text-sm mt-1">{fieldErrors.descripcion}</p>}
          </div>

          {/* Foto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                id="foto"
                name="foto"
                onChange={handleImageChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                accept="image/*"
              />
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="w-24 h-24 object-cover border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, foto: null }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    X
                  </button>
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {fieldErrors.foto && <span className="text-red-600">{fieldErrors.foto}</span>}
              {isEditing && !formData.foto && imagePreview
                ? "Se conservará la imagen actual si no seleccionas una nueva"
                : "Formatos recomendados: JPG, PNG. Máximo 5MB"}
            </p>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4">
            <Link
              to="/business-dashboard"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </span>
              ) : (
                isEditing ? 'Actualizar propiedad' : 'Crear propiedad'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
