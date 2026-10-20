import express from 'express';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && !/localhost|railway\.internal/.test(process.env.DATABASE_URL)
    ? { rejectUnauthorized: false } : false,
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ service: 'farm-management-api', status: 'running' }));
app.get('/health', (req, res) => res.json({ status: 'OK', message: 'Farm Management API is running' }));
app.get('/db/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ database: 'ok' });
  } catch (e) {
    res.status(500).json({ database: 'error', message: e.message });
  }
});
app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log(`Listening on ${port}`));
