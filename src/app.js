import express, {json, urlencoded} from "express"
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose"
import morgan from "morgan";

// Declaración de APP y PORT
const app = express();
<<<<<<< HEAD
const {PORT,SECRET} = process.env;

// Middlewares para APP
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser(SECRET));
=======
const {PORT, SECRET} = process.env;

// Middlewares para app
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
>>>>>>> b870ed7 (cookies 2)

// Inicio de servidor Express
app.listen(PORT, ()=>{
    console.log(`Listening port: ${PORT}`)
});

// Rutas generales
app.get("/", (req,res) =>{
<<<<<<< HEAD
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
=======
    res.send("Pagina principal")
});

app.get("/cookies", (req,res) =>{
    res.cookie("cookieRandom", "soy el valor de la cookie", {
        //httpOnly: true,
        maxAge: 20000
        //secure:true,
    })
    res.send("Pagina con cookie")
})

let count = 0
app.get("/session", (req,res) =>{
    count++
    let msj= `Usted ha visitado la pagina ${count} veces`;
    res.send(msj);
>>>>>>> b870ed7 (cookies 2)
})