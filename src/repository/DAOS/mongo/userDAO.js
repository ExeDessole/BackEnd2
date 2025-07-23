import userModel from "./models/userModel.js";
//CRUD CON MONGO LIMITADO A ACCIONES DE USUARIO

const userDao = {
  //Crea un asuario nuevo
  async createUser(data) {
    const user = new userModel(data);
    return await user.save();
  },
  //Filtra por email
  async findByEmail(email) {
    return await userModel.findOne({ email });
  },
  // Solo devuelve el usuario logueado
  getById(id) {
    return userModel.findById(id);
  },

  // Solo puede actualizar sus propios datos
  updateById(id, data) {
    return userModel.findByIdAndUpdate(id, data, { new: true });
  },

  // Solo puede eliminar su propia cuenta
  deleteById(id) {
    return userModel.findByIdAndDelete(id);
  }
};

export default userDao;
