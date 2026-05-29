import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const submitLead = async (data) => {
  const res = await api.post('/leads/submit', data);
  return res.data;
};

export const subscribeNewsletter = async (email) => {
  const res = await api.post('/newsletter/subscribe', { email });
  return res.data;
};

export const trackVisitor = async (sessionId) => {
  const res = await api.post('/analytics/track', { sessionId });
  return res.data;
};

export const getStats = async () => {
  const res = await api.get('/analytics/stats');
  return res.data;
};

export default api;
