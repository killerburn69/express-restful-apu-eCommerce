import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import routerUpload from './routes/upload.routes';
import connectDB from './config/db.config';
import cartRoutes from "./routes/cart.routes"
import cartegoriesRoutes from "./routes/categories.routes"
import brandRoutes from "./routes/brand.routes"
import productsRoutes from "./routes/product.routes"
import reviewRoutes from "./routes/review.routes"
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
app.use("/api/brand", brandRoutes)
app.use("/api/products", productsRoutes)
app.use("/api/reviews", reviewRoutes)
export default app;
