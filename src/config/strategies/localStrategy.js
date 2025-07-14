import { Strategy } from "passport-local";
import userModel from "../../DAOS/mongo/models/userModel.js";
import { generateToken } from "../../utils.js"

async function verifyRegister(req, email, password, done) {
    const {first_name, last_name, age, role} = req.body;
    try {
        const userFound = await userModel.findOne({email});
        if(userFound) return done(null, false, {message: "El usuario ya existe"});
        const newUser ={
            first_name,
            last_name,
            age,
            role,
            password,
            email,
        };
        const savedUser = await newUser.save();
        return done(null, savedUser);
  } catch (error) {
        console.log(error);
        return done("Internal server error");
    }
};

async function verifyLogin(email, password, done) {
    try {
        const user = await userModel.findOne({email});
        if(!user || user.password !== password){
            return done(null, false, {message: "Credencial invalida"})
        };

        const userObj = user.toObject();
        userObj.token = generateToken(user);

        return done( null, userObj)
    } catch (error) {
        console.log(error);
        return done("Internal server error");
    }
};


export const registerLocal = new Strategy({usernameField: "email", passReqToCallback: true}, verifyRegister);
export const loginLocal = new Strategy({usernameField: "email"}, verifyLogin)
