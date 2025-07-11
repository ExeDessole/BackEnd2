import { generateToken } from "../utils/generateToken.js";

const user = await userModel.findOne({ email });

if (!user) {
  return res.status(401).json({ error: "Credenciales inválidas" });
}

const token = generateToken(user);

res.json({ token });
