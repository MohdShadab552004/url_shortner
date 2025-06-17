// server.js or index.js
import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import mongoConnect from './config/db.js';
mongoConnect();
import routes from './routes/routes.js';

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.use("/", routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
