import express from 'express';
import morgan from 'morgan';

import connectDb from './app/config/db.js';
import { PORT } from './app/config/config.js';
import { urlRoutes } from './app/routes/url.js';
import limiter from './app/utils/rate-limiter.js';
import { corsMiddleware } from './app/middlewares/cors.js';

const app = express();

app.use(express.json());
app.disable('x-powered-by');
app.use(morgan('dev'))
app.use(limiter)
app.use(corsMiddleware())

connectDb();

app.use('/url', urlRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
})