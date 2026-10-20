import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './src/routes/auth.js';
import farmRoutes from './src/routes/farm.js';
import fieldRoutes from './src/routes/field.js';
import livestockRoutes from './src/routes/livestock.js';
import inventoryRoutes from './src/routes/inventory.js';
import workerRoutes from './src/routes/worker.js';
import financeRoutes from './src/routes/finance.js';
import taskRoutes from './src/routes/task.js';
import activityLogRoutes from './src/routes/activityLog.js';
import diaryRoutes from './src/routes/diary.js';
import aiChatRoutes from './src/routes/aiChat.js';
import userRoutes from './src/routes/user.js';
import dashboardRoutes from './src/routes/dashboard.js';
import { logger } from './src/utils/logger.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Farm Management API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/farms/:farmId/fields', fieldRoutes);
app.use('/api/farms/:farmId/livestock', livestockRoutes);
app.use('/api/farms/:farmId/inventory', inventoryRoutes);
app.use('/api/farms/:farmId/workers', workerRoutes);
app.use('/api/farms/:farmId/finance', financeRoutes);
app.use('/api/farms/:farmId/tasks', taskRoutes);
app.use('/api/farms/:farmId/activity-logs', activityLogRoutes);
app.use('/api/farms/:farmId/diary', diaryRoutes);
app.use('/api/farms/:farmId/ai-chat', aiChatRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  logger.info(`Farm Management API running on http://localhost:${PORT}`);
});

export default app;
