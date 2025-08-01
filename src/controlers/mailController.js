import servicesUser from "../services/userServices.js";
import mailService from "../services/mailServices.js";
import { validateToken } from "../utils.js";
import mongoose from "mongoose";


const renderRecoveryForm = (req, res) => {
  res.render("recovery/reqReset");
};

const sendRecoveryMail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await servicesUser.getUserByEmail(email);
    if (!user) return res.status(404).render("recovery/reqReset", { error: "Email no encontrado" });

    await mailService.sendPasswordRecoveryEmail(user);
    return res.render("recovery/reqReset", { success: "Correo enviado correctamente" });
  } catch (err) {
    console.error("❌ Error en recuperación:", err);
    return res.status(500).render("recovery/reqReset", { error: "Error al enviar el correo" });
  }
};

const renderResetForm = (req, res) => {
  const { token } = req.params;

  try {
    const decoded = validateToken(token);
    res.render("recovery/resetPassLink", { token });
  } catch (err) {
    return res.status(400).send("❌ Enlace inválido o expirado");
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = validateToken(token);
    const user = await servicesUser.getUserById(decoded.id);
    if (!user) return res.status(404).send("Usuario no encontrado");
console.log("🆔 ID usuario que está reseteando:", user._id);

    console.log("Es un documento de mongoose?", user instanceof mongoose.Document);
console.log("Contraseña antes:", user.password);
user.password = password;
user.markModified("password");
console.log("Nueva contraseña asignada:", user.password);
await user.save();
console.log("✅ Contraseña actualizada correctamente");


    return res.redirect("/login");
  } catch (err) {
    console.error("❌ Error al actualizar contraseña:", err);
    return res.status(400).send("Enlace inválido o expirado");
  }
};

export default {
  renderRecoveryForm,
  sendRecoveryMail,
  renderResetForm,
  resetPassword,
};