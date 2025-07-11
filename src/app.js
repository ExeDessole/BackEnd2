import express from "express";
import router from "./routes/index.js";
import connectDB from "./config/db.js";
import configHbs from "./config/handlebars.js";
import initializePAssport from "./config/passport.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// Variables de entorno
const app = express();
const {PORT, SECRET} = process.env;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(session({
  secret: SECRET,
  saveUninitialized: true,
  resave:false,
  cookie: {
    httpOnly: true,
    sameSite: true,
    maxAge: 24*60*60
  }
}));
//initializePAssport();
//app.use(passport.initialize());
//app.use(passport.session());

// Handlebars config
configHbs(app);

// Rutas
app.use("/", router);

// Conexión a MongoDB
connectDB();

// Middleware de 404 personalizado
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

//Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

export default app;