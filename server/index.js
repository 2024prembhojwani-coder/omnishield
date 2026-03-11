import express from 'express';
import cors from 'cors';
import { users, patients, appointments, labTests, vitals, prescriptions, inventory, staff, beds, compliance, surveillanceCases, hotspots, notifications, drugInteractions } from './data.js';
import { getChatbotResponse } from './chatbot.js';

const app = express();
const PORT = 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// ─── Auth ──────────────────────────────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser, token: 'mock_jwt_' + Date.now() });
});

app.post('/api/auth/register', (req, res) => {
  const { email, name, role, password } = req.body;
  const exists = users.find(u => u.email === email);
  if (exists) return res.status(400).json({ message: 'Email already registered' });
  const newUser = { id: 'U' + Date.now(), email, name, role, password, facility: 'City General Hospital' };
  users.push(newUser);
  const { password: _, ...safeUser } = newUser;
  res.json({ user: safeUser, token: 'mock_jwt_' + Date.now() });
});

// ─── Patients ──────────────────────────────────────────────────────────────
app.get('/api/patients', (req, res) => res.json(patients));

app.get('/api/patients/:id', (req, res) => {
  const p = patients.find(p => p.id === req.params.id);
  if (!p) return res.status(404).json({ message: 'Patient not found' });
  res.json(p);
});

app.post('/api/patients/scan', (req, res) => {
  const { patientId, geolocation, timestamp } = req.body;
  const p = patients.find(p => p.id === patientId);
  if (!p) return res.status(404).json({ message: 'Patient not found' });
  console.log(`Patient scanned: ${patientId} at ${timestamp} (${JSON.stringify(geolocation)})`);
  res.json({ success: true, patient: p });
});

// ─── Appointments ─────────────────────────────────────────────────────────
app.get('/api/appointments', (req, res) => {
  const { patientId, doctorId } = req.query;
  let filtered = [...appointments];
  if (patientId) filtered = filtered.filter(a => a.patientId === patientId);
  if (doctorId) filtered = filtered.filter(a => a.doctorId === doctorId);
  res.json(filtered);
});

app.post('/api/appointments', (req, res) => {
  const newAppt = { id: 'A' + Date.now(), status: 'Pending', ...req.body };
  appointments.push(newAppt);
  res.json(newAppt);
});

// ─── Lab Tests ────────────────────────────────────────────────────────────
app.get('/api/lab-tests', (req, res) => {
  const { status, patientId } = req.query;
  let filtered = [...labTests];
  if (status) filtered = filtered.filter(t => t.status === status);
  if (patientId) filtered = filtered.filter(t => t.patientId === patientId);
  res.json(filtered);
});

app.post('/api/lab-tests/:id/results', (req, res) => {
  const test = labTests.find(t => t.id === req.params.id);
  if (!test) return res.status(404).json({ message: 'Test not found' });
  test.results = req.body;
  test.status = 'Complete';
  res.json(test);
});

// ─── Vitals ───────────────────────────────────────────────────────────────
app.get('/api/vitals/:patientId', (req, res) => {
  const pVitals = vitals.filter(v => v.patientId === req.params.patientId);
  res.json(pVitals);
});

app.post('/api/vitals', (req, res) => {
  const newVital = { id: 'V' + Date.now(), timestamp: new Date().toISOString(), ...req.body };
  vitals.push(newVital);
  res.json(newVital);
});

// ─── Prescriptions ────────────────────────────────────────────────────────
app.get('/api/prescriptions', (req, res) => {
  const { status, patientId } = req.query;
  let filtered = [...prescriptions];
  if (status) filtered = filtered.filter(p => p.status === status);
  if (patientId) filtered = filtered.filter(p => p.patientId === patientId);
  res.json(filtered);
});

app.post('/api/prescriptions', (req, res) => {
  const newRx = { id: 'RX' + Date.now(), status: 'Pending', date: new Date().toISOString().split('T')[0], ...req.body };
  prescriptions.push(newRx);
  res.json(newRx);
});

app.get('/api/prescriptions/:id/dispense', (req, res) => {
  const rx = prescriptions.find(p => p.id === req.params.id);
  if (!rx) return res.status(404).json({ message: 'Prescription not found' });
  rx.status = 'Dispensed';
  rx.dispensedAt = new Date().toISOString();
  res.json(rx);
});

// ─── Inventory ────────────────────────────────────────────────────────────
app.get('/api/inventory', (req, res) => res.json(inventory));

app.post('/api/inventory/alert', (req, res) => {
  const { drugId } = req.body;
  const item = inventory.find(i => i.id === drugId);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  res.json({ success: true, message: `Restock request sent for ${item.drug}` });
});

// ─── Staff ────────────────────────────────────────────────────────────────
app.get('/api/staff', (req, res) => res.json(staff));

// ─── Beds ─────────────────────────────────────────────────────────────────
app.get('/api/beds', (req, res) => res.json(beds));

// ─── Compliance ───────────────────────────────────────────────────────────
app.get('/api/compliance', (req, res) => res.json(compliance));

// ─── Surveillance ─────────────────────────────────────────────────────────
app.get('/api/surveillance/cases', (req, res) => res.json(surveillanceCases));
app.get('/api/surveillance/hotspots', (req, res) => res.json(hotspots));
app.get('/api/surveillance/forecast', (req, res) => {
  const { R0 = 2.5, gamma = 0.1, sigma = 0.2, population = 1000000 } = req.query;
  const S0 = 950000, I0 = 1000, E0 = 5000;
  const FORECAST_DAYS = 180, STEP_DAYS = 5;
  const data = [];
  let S = S0, I = I0, recovered = 0, E = E0;
  const r0 = parseFloat(R0), g = parseFloat(gamma), s = parseFloat(sigma);
  for (let day = 0; day <= FORECAST_DAYS; day += STEP_DAYS) {
    data.push({ day, susceptible: Math.round(S), exposed: Math.round(E), infected: Math.round(I), recovered: Math.round(recovered) });
    const beta = r0 * g;
    const N = S + E + I + recovered;
    const newExposed = beta * S * I / N;
    const newInfected = s * E;
    const newRecovered = g * I;
    S -= newExposed;
    E += newExposed - newInfected;
    I += newInfected - newRecovered;
    recovered += newRecovered;
    if (S < 0) S = 0;
    if (E < 0) E = 0;
    if (I < 0) I = 0;
  }
  res.json(data);
});

// ─── Chatbot ─────────────────────────────────────────────────────────────
app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Message required' });
  const response = getChatbotResponse(message);
  res.json(response);
});

// ─── Notifications ────────────────────────────────────────────────────────
app.get('/api/notifications/:userId', (req, res) => {
  const userNotifs = notifications.filter(n => n.userId === req.params.userId);
  res.json(userNotifs);
});

// ─── Drug Interactions ────────────────────────────────────────────────────
app.get('/api/drug-interactions', (req, res) => res.json(drugInteractions));

app.listen(PORT, () => console.log(`OmniShield server running on port ${PORT}`));
