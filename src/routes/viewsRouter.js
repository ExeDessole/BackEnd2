import { Router } from "express";

const viewsRouter = Router();

// Página principal
viewsRouter.get("/", (req, res) => {
  res.render("index");
});

// Página de login
viewsRouter.get("/login", (req, res) => {
  res.render("login");
});

// Página de registro
viewsRouter.get("/register", (req, res) => {
  res.render("register");
});

// Perfil del usuario
viewsRouter.get("/profile", (req, res) => {
  res.render("profile");
});

// Página de error (fallo)
viewsRouter.get("/failed", (req, res) => {
  res.render("failed");
});

export default viewsRouter;