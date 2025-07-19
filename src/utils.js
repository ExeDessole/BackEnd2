import jwt from "jsonwebtoken";
import adminModel from "../src/DAOS/mongo/models/adminModel.js";

//F: Generador de token
export const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role || "user",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

//F: Crea un admin por default (creador del proyecto)
export async function createDefaultAdmin() {
  const existingAdmin = await adminModel.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existingAdmin) {
    await adminModel.create({
      first_name: "Exequiel",
      last_name: "Dessole",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      superAdmin: true
    });
    console.log("✅ Admin creado automáticamente");
  }
};