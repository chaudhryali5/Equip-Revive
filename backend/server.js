import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import { connectdb } from './config/db.js'
import userRouter from './routes/userRoutes.js';
import googleRouter from './routes/googleRoutes.js';
import contactRouter from './routes/contactRoutes.js';
import serviceRouter from './routes/servicesRoutes.js';
import orderRouter from './routes/orderRoutes.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000
const PREFIX = '/api/v1';

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(cookieParser());

app.use(PREFIX, userRouter);
app.use(PREFIX, googleRouter);
app.use(PREFIX, contactRouter);
app.use(PREFIX, serviceRouter);
app.use(PREFIX,orderRouter)

app.get('/', (req, res) => {
    res.send("hello from server")
})

connectdb();

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
})