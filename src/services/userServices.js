import userModel from "../DAOS/mongo/models/userModel.js";
import userDao from "../DAOS/mongo/userDAO.js"

const servicesUser = {
    async createUser(data) {
  try {
    const existing = await userDao.findByEmail(data.email);
    if (existing) throw new Error("El email ya está en uso");

    const user = new userModel(data);
    return await user.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("El email ya está registrado (duplicado)");
    }
    throw error;
  }
}
,
    async getUserById(id) {
        const user = await userDao.getById(id);
        if(!user) throw new Error("Usuario no encontrado");
        return user;
    },
    async getUserByEmail(email){
        const e_mail = await userDao.findByEmail(email);
        return e_mail;
    },
    async updateUser(id, data) {
        const userUpdated = await userDao.updateById(id, data);
        if(!userUpdated) throw new Error("No se puede actualizar");
        return userUpdated;
    },
    async deleteUser(id) { 
        const userDeleted = await userDao.deleteById(id);
        if(!userDeleted) throw new Error("No se pudo eliminar el usuario");
        return userDeleted;
    }
};

export default servicesUser;
