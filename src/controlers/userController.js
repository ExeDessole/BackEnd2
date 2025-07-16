import servicesUser from "../services/userService.js";

export async function getUserProfile(req, res) {
  try {
    const userId = req.user._id;
    const user = await servicesUser.getUser(userId);
    res.status(200).render("user/profile", {user});
  } catch (error) {
    res.status(404).render("auth/failed", { error: error.message });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const userId = req.user._id;
    const updateData = req.body;
    const updatedUser = await servicesUser.updateUser(userId, updateData);
    res.status(200).render("user/profile", {updatedUser});
  } catch (error) {
    res.status(400).render("auth/failed", { error: error.message });
  }
}

export async function deleteUserAccount(req, res) {
  try {
    const userId = req.user._id;
    const deletedUser = await servicesUser.deleteUser(userId);
    res.status(200).json({
      message: "Usuario eliminado correctamente",
      deletedUser,
    });
  } catch (error) {
    res.status(400).render("auth/failed", { error: error.message });
  }
}
