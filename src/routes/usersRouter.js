import { Router } from "express";
import userModel from "../models/userModel.js";

const usersRouter = Router();

//CRUD USER
//RETURN USER LIST
usersRouter.get("/", async (req,res) =>{
  try {
    res.status(200).json(await userModel.find());
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener usuarios",
      details: error.message,
    });
  }
});
//RETURN USER BY ID 
usersRouter.get("/:id", async (req,res) =>{
  try {
    res.json(await userModel.findById(req.params.id))
  } catch (error) {
    res.status(500).json({
      error: "Usuario no encontrado",
      details: error.message
    });
  }
});

//DELETE USER BY ID
usersRouter.delete("/:id", async (req,res) =>{
  try {
    res.json(await userModel.findByIdAndDelete({_id: req.params.id}));
  } catch (error) {
    res.status(500).json({
      error: "No se pudo eliminar el usuario",
      details: error.message
    });
  }
});
