import { Router } from "express";

const views = Router();

// Página principal
views.get("/", (req, res) => {
  res.render("index");
});

// Página de login
views.get("/login", (req, res) => {
  res.render("auth/login");
});

// Página de registro
views.get("/register", (req, res) => {
  res.render("auth/register");
});

// Perfil del usuario
views.get("/profile", (req, res) => {
  res.render("user/profile");
});

// Página de error (fallo)
views.get("/failed", (req, res) => {
  res.render("auth/failed");
});

export default views;