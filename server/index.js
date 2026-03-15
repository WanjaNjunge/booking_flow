import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

import postcodeRouter from './routes/postcode.js';
import wasteTypesRouter from './routes/wasteTypes.js';
import skipsRouter from './routes/skips.js';
import bookingRouter from './routes/booking.js';
import debugRouter from './routes/debug.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api', postcodeRouter);
app.use('/api', wasteTypesRouter);
app.use('/api', skipsRouter);
app.use('/api', bookingRouter);
app.use('/api', debugRouter);

// Serve static files in production
const distPath = join(__dirname, '..', 'dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA catch-all — all non-API routes serve index.html
  app.get('*', (_req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`);
});
