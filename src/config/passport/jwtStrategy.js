
import jwt from passport
import userModel from "../../models/userModel.js";

async function verifyRegister(paramsreq, username, password, don) {
    const {first_name, last_name, age, role} = req;
    try {
        const userFound = await userModel.findOne({email: username});
        if(userFound) return done(null, false, {message: "El usuario ya existe"});
        const newUser ={
            first_name,
            last_name,
            age,
            role,
            password,
            email: username
        };
        const newDoc = await userModel.create(newUser);
        return done(null, newDoc);
    } catch (error) {
        console.log(error);
        return done("Internal server error");
    }
};

async function verifyLogin(paramsreq, username, password, don) {
    try {
        const user = await userModel.findById({email: username});
        if(!user || user.password !== password){
            return done(null, false, {message: "Credencial invalida"})
        };
        return done( null, user)
    } catch (error) {
        console.log(error);
        return done("Internal server error");
    }
};


export const registerLocal = new Strategy({usernameField: "email", passReqToCallback: true}, verifyRegister);
export const loginLocal = new Strategy({usernameField: "email"}, verifyLogin)
