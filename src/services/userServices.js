import userDao from "../DAOS/mongo/user.DAO.js";

const servicesUser = {
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
