import { Strategy } from "passport-local";
import servicesUser from "../../services/userServices.js";

async function verifyRegister(req, username, password, done) {
  try {
    const { first_name, last_name, age, role } = req.body;

    const userFound = await servicesUser.getUserByEmail(username);
    if (userFound) {
      return done(null, false, { message: "El usuario ya existe" });
    }

    const newUser = {
      first_name,
      last_name,
      email: username,
      age: Number(age),
      role: role || "user",
      password,
    };

    const savedUser = await servicesUser.createUser(newUser);
    return done(null, savedUser);
  } catch (error) {
    console.error("❌ Error en verifyRegister:", error);
    return done("Internal server error");
  }
};

async function verifyLogin(username, password, done) {
  try {
    console.log("🔑 Intentando login con:", username);
    const user = await servicesUser.getUserByEmail(username);
    console.log("🆔 ID usuario que intenta loguearse:", user._id);

    if (!user) {
      console.warn("⚠️ Usuario no encontrado");
      return done(null, false, { message: "Usuario no encontrado" });
    }

    console.log("👉 Usuario encontrado:", user.email);
    const isValid = await user.comparePassword(password);
    console.log("✅ ¿Password válido?", isValid);

    if (!isValid) {
      console.warn("❌ Contraseña incorrecta");
      return done(null, false, { message: "Contraseña incorrecta" });
    }

    return done(null, user);
  } catch (error) {
    console.error("❌ Error en verifyLogin:", error);
    return done(error); // <- esto es lo que dispara el "Error interno de autenticación"
  }
}


export const registerLocal = new Strategy({usernameField: "email", passReqToCallback: true}, verifyRegister);
export const loginLocal = new Strategy({usernameField: "email"}, verifyLogin);