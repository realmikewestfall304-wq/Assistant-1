import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tasks API
export const tasksAPI = {
  getAll: (filters) => api.get('/tasks', { params: filters }),
  getOne: (id) => api.get(`/tasks/${id}`),
  create: (data) => api.post('/tasks', data),
  update: (id, data) => api.put(`/tasks/${id}`, data),
  delete: (id) => api.delete(`/tasks/${id}`),
  getSubtasks: (id) => api.get(`/tasks/${id}/subtasks`),
};

// Calendar API
export const calendarAPI = {
  getAll: (filters) => api.get('/calendar', { params: filters }),
  getOne: (id) => api.get(`/calendar/${id}`),
  create: (data) => api.post('/calendar', data),
  update: (id, data) => api.put(`/calendar/${id}`, data),
  delete: (id) => api.delete(`/calendar/${id}`),
};

// Reminders API
export const remindersAPI = {
  getAll: (filters) => api.get('/reminders', { params: filters }),
  getOne: (id) => api.get(`/reminders/${id}`),
  create: (data) => api.post('/reminders', data),
  update: (id, data) => api.put(`/reminders/${id}`, data),
  delete: (id) => api.delete(`/reminders/${id}`),
  snooze: (id, minutes) => api.post(`/reminders/${id}/snooze`, { minutes }),
};

// Financial API
export const financialAPI = {
  getTransactions: (filters) => api.get('/financial/transactions', { params: filters }),
  createTransaction: (data) => api.post('/financial/transactions', data),
  updateTransaction: (id, data) => api.put(`/financial/transactions/${id}`, data),
  deleteTransaction: (id) => api.delete(`/financial/transactions/${id}`),
  getSummary: (filters) => api.get('/financial/summary', { params: filters }),
  getGoals: () => api.get('/financial/goals'),
  createGoal: (data) => api.post('/financial/goals', data),
  updateGoal: (id, data) => api.put(`/financial/goals/${id}`, data),
};

// Mentor API
export const mentorAPI = {
  getTopics: () => api.get('/mentor/topics'),
  getAdvice: (topic) => api.get(`/mentor/advice/${topic}`),
  getAllAdvice: () => api.get('/mentor/advice'),
  getMotivation: () => api.get('/mentor/motivation'),
  getDecisionFramework: () => api.get('/mentor/decision-framework'),
  getProblemSolving: () => api.get('/mentor/problem-solving'),
};

// Business Plan API
export const businessPlanAPI = {
  getPlans: () => api.get('/business-plan/plans'),
  getPlan: (id) => api.get(`/business-plan/plans/${id}`),
  createPlan: (data) => api.post('/business-plan/plans', data),
  updatePlan: (id, data) => api.put(`/business-plan/plans/${id}`, data),
  deletePlan: (id) => api.delete(`/business-plan/plans/${id}`),
  getGoals: (filters) => api.get('/business-plan/goals', { params: filters }),
  createGoal: (data) => api.post('/business-plan/goals', data),
  updateGoal: (id, data) => api.put(`/business-plan/goals/${id}`, data),
  getTemplates: () => api.get('/business-plan/templates'),
  getSWOTTemplate: () => api.get('/business-plan/swot-template'),
};

// Communications API
export const communicationsAPI = {
  getContacts: (filters) => api.get('/communications/contacts', { params: filters }),
  createContact: (data) => api.post('/communications/contacts', data),
  updateContact: (id, data) => api.put(`/communications/contacts/${id}`, data),
  deleteContact: (id) => api.delete(`/communications/contacts/${id}`),
  getLogs: (filters) => api.get('/communications/logs', { params: filters }),
  createLog: (data) => api.post('/communications/logs', data),
  getFollowUps: () => api.get('/communications/follow-ups'),
  getTemplates: () => api.get('/communications/templates'),
};

// Management API
export const managementAPI = {
  getKnowledge: (filters) => api.get('/management/knowledge', { params: filters }),
  getKnowledgeEntry: (id) => api.get(`/management/knowledge/${id}`),
  createKnowledge: (data) => api.post('/management/knowledge', data),
  updateKnowledge: (id, data) => api.put(`/management/knowledge/${id}`, data),
  deleteKnowledge: (id) => api.delete(`/management/knowledge/${id}`),
  getDashboardStats: () => api.get('/management/dashboard/stats'),
};

export default api;
