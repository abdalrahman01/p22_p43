import express from 'express';
import cors from 'cors';

import cryptoJS from 'crypto-js';

const app = express();
const port = 9070;

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: 'GET, POST',
    optionsSuccessStatus: 200
}));


init();

export {app}