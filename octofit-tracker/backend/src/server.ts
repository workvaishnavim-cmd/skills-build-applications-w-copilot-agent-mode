import express from 'express';
import cors from 'cors';
import './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]);
if (codespaceName) {
  allowedOrigins.add(`https://${codespaceName}-5173.app.github.dev`);
}
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, !origin || allowedOrigins.has(origin));
    },
  }),
);
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.use(apiRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
    return;
  }

  if (error instanceof Error && 'code' in error && error.code === 11000) {
    response.status(409).json({ error: 'A record with that unique value already exists.' });
    return;
  }

  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error.' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
});