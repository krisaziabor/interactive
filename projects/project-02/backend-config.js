import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { createConnection } from 'mysql2';

const app = express();

dotenv.config({ path: 'private.env' });

var db = createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "kojoLEAGUE",
});

app.use(cors());

export { app, db };