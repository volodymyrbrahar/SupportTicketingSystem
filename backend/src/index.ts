import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ticketRoutes from './routes/ticketRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Root endpoint welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Support Ticket System Backend API is active',
    frontendUrl: 'http://localhost:3000',
    endpoints: {
      tickets: 'http://localhost:4000/tickets',
      health: 'http://localhost:4000/health',
    },
  });
});

// Healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/tickets', ticketRoutes);

// Error middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Support Ticket System Backend listening on port ${port}`);
});
