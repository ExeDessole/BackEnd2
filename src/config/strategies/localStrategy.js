import { Strategy } from "passport-local";
import userModel from "../../DAOS/mongo/models/userModel.js";
import { generateToken } from "../../utils.js"
import adminModel from "../../DAOS/mongo/models/adminModel.js";

async function verifyRegister(req, email, password, done) {
    const {first_name, last_name, age, role} = req.body;
    try {
        console.log("📥 Datos recibidos:", req.body);
        const userFound = await userModel.findOne({email});
        if(userFound) return done(null, false, {message: "El usuario ya existe"});
        const newUser = new userModel({
            first_name,
            last_name,
            age,
            role,
            password,
            email,
        });
        const savedUser = await newUser.save();
        console.log("✅ Usuario guardado:", savedUser);
        return done(null, savedUser);
  } catch (error) {
        console.error("❌ Error al registrar:", error);
        return done("Internal server error");
    }
};

async function verifyLogin(email, password, done) {
  try {
    const user = await userModel.findOne({ email });
    if (!user) return done(null, false, { message: "Usuario no encontrado" });

    const isValid = await user.comparePassword(password);
    if (!isValid) return done(null, false, { message: "Contraseña incorrecta" });

    // No agregues token ni hagas toObject
    return done(null, user); 
  } catch (error) {
    return done(error);
  }
};

export const registerLocal = new Strategy({usernameField: "email", passReqToCallback: true}, verifyRegister);
export const loginLocal = new Strategy({usernameField: "email"}, verifyLogin)
