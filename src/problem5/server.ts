import * as dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import { AppDataSource } from './configs/database';
import { errorMiddleware } from './middlewares/error.middleware';
import taskRoutes from './routes/tasks';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/tasks', taskRoutes);

app.use(errorMiddleware);
async function startServer() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}/api/v1`);
        });
    } catch (error) {
        console.error(`Error starting server: ${(error as Error).message}`);
        process.exit(1);
    }
}

startServer();
