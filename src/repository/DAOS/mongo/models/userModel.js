import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Esquema de usuario
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  age: Number,
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});

// Middleware para hashear contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("Password no modificado, next");
    return next();
  }

  try {
    console.log("🔒 Hasheando contraseña:", this.password);
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    console.log("✅ Contraseña hasheada:", this.password);

    next();
  } catch (error) {
    next(error);
  }
});


// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

// Modelo
const userModel = mongoose.model("User", userSchema);

export default userModel;
