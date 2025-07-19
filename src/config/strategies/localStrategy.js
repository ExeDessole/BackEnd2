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
        console.log("Buscando usuario con email:", email);
        const user = await userModel.findOne({email});
        const role = "user";
        console.log("No se encontró en users, buscando en admins...");
        if(!user){
          const user = await adminModel.findOne({email});
          const role = "admin";  
        };
        console.log("❌ Usuario no encontrado en ninguna colección.");
        if(!user){
            return done(null, false, {message: "Usuario no encontrado"});
        };

        const isValid = await user.comparePassword(password);

        if(!isValid){
             console.log("❌ Contraseña inválida.");
            return done(null, false, {message: "Credencial invalida"});
        };

        const userObj = user.toObject();
        userObj.role = role;
        userObj.token = generateToken(user);

        return done( null, userObj)
    } catch (error) {
        console.log(error);
        return done("Internal server error");
    }
};


export const registerLocal = new Strategy({usernameField: "email", passReqToCallback: true}, verifyRegister);
export const loginLocal = new Strategy({usernameField: "email"}, verifyLogin)
