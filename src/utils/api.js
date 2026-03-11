import { API_BASE } from './constants.js'

function getToken() {
  return localStorage.getItem('omnishield_token')
}

function headers(extra = {}) {
  const h = { 'Content-Type': 'application/json', ...extra }
  const token = getToken()
  if (token) h['Authorization'] = `Bearer ${token}`
  return h
}

async function request(path, options = {}) {
  // TODO: Replace with real backend URL
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: headers(options.headers),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || 'Request failed')
  }
  return res.json()
}

export const api = {
  get:    (path)         => request(path),
  post:   (path, body)   => request(path, { method: 'POST',   body: JSON.stringify(body) }),
  put:    (path, body)   => request(path, { method: 'PUT',    body: JSON.stringify(body) }),
  delete: (path)         => request(path, { method: 'DELETE' }),

  // Domain helpers — TODO: wire to real endpoints
  getPatients:     ()     => api.get('/patients'),
  getHealthCard:   (id)   => api.get(`/health-cards/${id}`),
  getSurveillance: ()     => api.get('/surveillance/summary'),
  getFHIRResource: (type) => api.get(`/fhir/${type}`),
}
