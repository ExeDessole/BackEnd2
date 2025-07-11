import mongoose from "mongoose";

const {MONGO_URI, DB_NAME} = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {dbName: DB_NAME});
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;