import express, {json, urlencoded} from "express"
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose"
import morgan from "morgan";
import dotenv from 'dotenv';

// Config variables de entorno
dotenv.config();

// Declaración de APP y PORT
const APP = express();
const PORT = process.env.PORT;

// Middlewares para APP
APP.use(json());
APP.use(urlencoded({ extended: true }));
APP.use(morgan("dev"));

// Inicio de servidor Express
APP.listen(PORT, ()=>{
    console.log(`Listening port: ${PORT}`)
});

// Rutas generales
APP.get("/", (req,res) =>{
    res.send("Pagina principal")
})