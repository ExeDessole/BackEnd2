import { Router } from "express";
import passport from "passport";

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
views.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.render("user/profile", { user: req.user });
  }
);


// Página de error (fallo)
views.get("/failed", (req, res) => {
  res.render("auth/failed");
});

export default views;