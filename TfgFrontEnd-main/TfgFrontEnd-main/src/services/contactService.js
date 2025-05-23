import api from './api';

// Corresponde a POST /contacto (ruta pública para enviar un mensaje)
const sendContactMessage = async (contactData) => {
  // contactData podría ser { property_id (opcional), name, email, message, phone (opcional) }
  const response = await api.post('/contacto', contactData);
  return response.data;
};

// Corresponde a GET /mis-contactos (ruta protegida para rol:negocio)
const getMyContacts = async () => {
  const response = await api.get('/mis-contactos');
  return response.data; // Espera una lista de contactos
};

// Corresponde a PUT /contacto/{id}/leido (ruta protegida para rol:negocio)
const markContactAsRead = async (contactId) => {
  const response = await api.put(`/contacto/${contactId}/leido`);
  return response.data;
};

export default {
  sendContactMessage,
  getMyContacts,
  markContactAsRead,
};
