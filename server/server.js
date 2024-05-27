import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler } from './middleware/errorHandler.js';
import noteRoutes from './routes/noteRoutes.js';
import drawingsRoute from './routes/drawingsRoute.js';
import sequelize from './config/database.js';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Routes
app.use('/api/notes', noteRoutes);
app.use('/api/drawings', drawingsRoute);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});