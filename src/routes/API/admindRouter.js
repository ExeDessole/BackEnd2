import { Router } from "express";


const adminRouter = Router();

//CRUD ADMIN CON TODOS LOS PERMISOS
// CREATE USER
adminRouter.post("/", );

// READ ALL USERS
adminRouter.get("/", );

// READ USER BY ID
adminRouter.get("/:id", );

// UPDATE USER
adminRouter.put("/:id", );

// DELETE USER
adminRouter.delete("/:id", );

export default adminRouter;