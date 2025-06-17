import express, {json, urlencoded} from "express"
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose"
import morgan from "morgan";

// Declaración de APP y PORT
const app = express();
const {PORT,SECRET} = process.env;

// Middlewares para APP
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser(SECRET));

// Inicio de servidor Express
app.listen(PORT, ()=>{
    console.log(`Listening port: ${PORT}`)
});

// Rutas generales
app.get("/", (req,res) =>{
    res.cookie("CookiePrueba", "valor de la cookie", {
        maxAge: 10000,
        sameSite: true, 
        signed: true,
        httpOnly: true
    })
    res.send("Pagina principal CON COOKIE")
})

app.get("/view-cookie", (req,res) =>{
    let cookie_datos = req.cookies;
    res.send(`Datos de la cookie: ${cookie_datos}`)
})

app.get("/register", (req,res) =>{
    res.send("Pagina de registro")
})

app.get("/login", (req,res) =>{
    res.send("Pagina de login")
})

app.get("/protegida", (req,res) =>{
    res.send("Pagina protegida")
})