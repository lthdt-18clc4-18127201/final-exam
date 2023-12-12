import dotenv from 'dotenv/config'
import express from 'express';
import userRouter from './routes/user.route.js';
import siteRouter from './routes/site.route.js';
import authRouter from './routes/auth.route.js';

import authMdw from './middlewares/auth.mdw.js';
import cors from 'cors';
import connection from './utils/db.js';

const app = express();
const PORT = process.env.PORT || 8080;

connection();

app.use(express.json());
app.use(cors({
    origin: 'http:localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use('/api/auth', authRouter);
app.use('/', authMdw, siteRouter);
app.use('/api/users', authMdw, userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
})