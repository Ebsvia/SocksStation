import express from "express";
import marketersController from './controllers/marketersController';

const app = express();

//middleware
app.use(express.json());

//Routes
app.use('/', marketersController)

export default app;
