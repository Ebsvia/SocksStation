import express from "express";
import bodyParser from 'body-parser';
import routes from './routes/index';



const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Routes
app.use('/', routes);

export default app;
