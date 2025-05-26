import express, {json, urlencoded} from "express"
import mongoose from "mongoose"
import morgan from "morgan";

const APP = express();
const PORT = process.env.PORT;

APP.use(json());
APP.use(urlencoded({ extended: true }));
APP.use(morgan("dev"));

APP.listen(PORT, ()=>{
    console.log(`Listening port: ${PORT}`)
});