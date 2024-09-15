import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import routerUpload from './routes/upload.routes';
import connectDB from './config/db.config';
import cartRoutes from "./routes/cart.routes"
import cartegoriesRoutes from "./routes/categories.routes"
dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api', routerUpload)
app.use('/api/cart', cartRoutes)
app.use('/api/categories', cartegoriesRoutes)
export default app;
