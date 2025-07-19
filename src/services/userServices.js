import userDao from "../DAOS/mongo/userDAO.js";
import userModel from "../DAOS/mongo/models/userModel.js";

const servicesUser = {
    async createUser(userData) {
    const existing = await userDAO.findByEmail(userData.email);
    if (existing) throw new Error("El email ya está en uso");
    return await userDAO.create(userData);
    },
    async getUser(id) {
        const user = await userDao.getById(id);
        if(!user) throw new Error("Usuario no encontrado");
        return user;
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
