import userModel from "./models/userModel.js";
//CRUD CON MONGO LIMITADO A ACCIONES DE USUARIO

const userDao = {
  // Solo devuelve el usuario logueado
  getById(id) {
    return userModel.findById(id).lean();
  },

  // Solo puede actualizar sus propios datos
  updateById(id, data) {
    return userModel.findByIdAndUpdate(id, data, { new: true }).lean();
  },

  // Solo puede eliminar su propia cuenta
  deleteById(id) {
    return userModel.findByIdAndDelete(id);
  }
};

export default userDao;
