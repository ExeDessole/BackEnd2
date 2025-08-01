import { Router } from "express";
import passport from "passport";
import UserDTO from "../DTOs/userDTO.js"
import mailRouter from "./API/mailRouter.js";
import productServices from "../services/productServices.js";
import { getProducts } from "../controlers/productController.js";

const views = Router();

views.use("/recovery", mailRouter);

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

// Perfil del usuario seguro con DTO (recibe todo menos la password)
views.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const safeUser = new UserDTO(req.user);
    res.render("user/profile", { user: safeUser });
  }
);
// Página de recupero de contraseña
views.get("/recovery", (req, res) => {
  res.render("recovery/reqReset");
});

// Mostrar formulario para cambiar la contraseña (desde link con token)
views.get("/recovery/resetPassLink", (req, res) => {
  const { token } = req.query;
  res.render("recovery/resetPassLink", { token });
});
views.get("/products", async (req,res) => {
  const products = await productServices.getProducts();
  console.log("🟢 Productos para render:", products);
  res.render("product/productList", { products });
});

// Página de error
views.get("/failed", (req, res) => {
  res.render("auth/failed");
});

//Vista del carrito
views.get("/cart", async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await cartServices.getCart(userId);
    res.render("product/cart", { cart });
  } catch (error) {
    res.status(500).render("auth/failed", { error: error.message });
  }
});

views.post("/cart/remove/:productId", async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    await cartServices.removeProduct(userId, productId);
    res.redirect("/cart");
  } catch (error) {
    res.status(500).render("auth/failed", { error: error.message });
  }
});

views.post("/cart/clear", async (req, res) => {
  try {
    const userId = req.user._id;
    await cartServices.clear(userId);
    res.redirect("/cart");
  } catch (error) {
    res.status(500).render("auth/failed", { error: error.message });
  }
});

export default views;