import api from './api';

const businessService = {
  sendBusinessRequest: async (formData) => {
    const response = await api.post('/solicitud-negocio', formData);
    return response.data;
  },
  getAllBusinessRequests: async () => {
    const response = await api.get('/solicitudes-negocio');
    return response.data;
  },
  approveBusinessRequest: async (id) => {
    const response = await api.post(`/solicitud-negocio/${id}/aprobar`);
    return response.data;
  },
  rejectBusinessRequest: async (id) => {
    const response = await api.delete(`/solicitud-negocio/${id}/rechazar`);
    return response.data;
  }
};

export default businessService;
