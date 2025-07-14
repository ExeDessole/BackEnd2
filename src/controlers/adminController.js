import userModel from "../DAOS/mongo/models/userModel.js";


//CRUD ADMIN CON TODOS LOS PERMISOS
// CREATE USER
adminRouter.post("/", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    res.redirect("profile"); // Redirigí a una vista si estás usando Handlebars
  } catch (error) {
    res.status(500).render("failed", {
      errorMessage: "Error al crear el usuario",
    });
  }
});

// READ ALL USERS
adminRouter.get("/", async (req, res) => {
  try {
    const userList = await userModel.find();
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener usuarios",
      details: error.message,
    });
  }
});

// READ USER BY ID
adminRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user)
      return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      errorMessage: "ID inválido o error en el servidor",
      details: error.message,
    });
  }
});

// UPDATE USER
adminRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json({
      message: "Usuario actualizado",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Error al actualizar el usuario",
      details: error.message,
    });
  }
});

// DELETE USER
adminRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ error: "Usuario no encontrado" });

    res.status(200).json({
      message: "Usuario eliminado",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Error al eliminar el usuario",
      details: error.message,
    });
  }
});