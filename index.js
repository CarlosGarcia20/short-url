import express from 'express';
import morgan from 'morgan';
import 'dotenv/config'

import connectDb from './app/config/db.js';
import { PORT } from './app/config/config.js';
import { urlRoutes } from './app/routes/url.js';

const app = express();

app.use(express.json());
app.disable('x-powered-by');
app.use(morgan('dev'))
connectDb();

app.use('/url', urlRoutes)

if (process.env.NODE_ENV !== 'test') {
    app.listen(4000, () => {
        console.log('Servidor corriendo en el puerto: 4000');
    });
}

// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en el puerto: ${PORT}`);
// })


export default app