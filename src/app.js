import express from "express";
import {engine} from "express-handlebars"
import viewsRouter from "./routes/viewsRouter.js";
import usersRouter from "./routes/usersRouter.js";
import sessionsRouter from "./routes/sessionsRouter.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// Para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Variables de entorno
const app = express();
const {PORT, SECRET, URI_DB} = process.env;

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

// Handlebars config
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use("/users", viewsRouter);
app.use("api//users", usersRouter);
app.use("api/sessions", sessionsRouter);

// Conexión a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI_DB, {dbName: "practicaIntegradora"});
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

connectDB();

//Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
