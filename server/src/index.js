import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from '../src/routes/auth.routes.js';
import userRouter from '../src/routes/user.routes.js';
import websiteRouter from './routes/website.routes.js';
import deployRoutes from './routes/deploy.route.js';
//import paymentRouter from './routes/stripe.route.js';

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/website', websiteRouter);
//app.use('/api/payment', paymentRouter);
app.use("/api", deployRoutes);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});