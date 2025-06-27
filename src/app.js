import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose";
import morgan from "morgan";

// Declaración de APP y PORT
const app = express();

const { PORT, SECRET } = process.env;
const URI_DB = "mongodb+srv://admin:admin@appstock.iwvpmwv.mongodb.net./AppStock?retryWrites=true&w=majority";

// Middlewares para APP
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser(SECRET));

// Middlewares para app
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser(SECRET));

// Inicio de servidor Express
app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});

// Conexion a AppStock DB
const connectDB = async () => {
  try {
    await mongoose.connect(URI_DB);
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};
connectDB();

// Rutas generales

app.get("/", (req, res) => {
  res.cookie("CookiePrueba", "valor de la cookie", {
    maxAge: 10000,
    sameSite: true,
    signed: true,
    httpOnly: true,
  });
});  // << Cerré la llave y paréntesis que faltaban aquí

app.get("/", (req, res) => {
  res.cookie("CookieExe", "valor de la cookie", {
    //{name: Exe, last_name: Dessole},
    httpOnly: true,
    sameSite: true,
    maxAge: 10000,
    //secure: true
  });
  res.send("Pagina principal CON COOKIE");
});

app.get("/view-cookie", (req, res) => {
  let cookie_datos = req.cookies;
  res.send(`Datos de la cookie: ${cookie_datos}`);
});

app.get("/view-cookie", (req, res) => {
  console.log(req.cookies);
  res.send(req.cookies);
});

/*app.get("/register", (req,res) =>{
    res.send("Pagina de registro");
})

app.get("/login", (req, res) => {
    res.send("Pagina de login");
})

app.get("/protegida", (req, res) => {
    res.send("Pagina protegida");
});

app.get("/cookies", (req,res) =>{
    res.cookie("cookieRandom", "soy el valor de la cookie", {
        //httpOnly: true,
        maxAge: 20000
        //secure:true,
    });
    res.send("Pagina con cookie");
})

let count = 0
app.get("/session", (req,res) =>{
    count++;
    let msj= `Usted ha visitado la pagina ${count} veces`;
    res.send(msj);
})
*/
