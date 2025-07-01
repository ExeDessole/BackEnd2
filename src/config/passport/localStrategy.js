import { Strategy } from "passport-local";
import userModel from "../../models/userModel.js";

async function verifyRegister(paramsreq, username, password, don) {
    const {first_name, last_name, age, role} = req;
    try {
        const userFound = await userModel.findOne({email: username});
        if(userFound) return done(null, false, {message: "User alredy exist"});
        new u
    } catch (error) {
        
    }
};

async function verifyLogin(paramsreq, username, password, don) {
    
};


export const registerLocal = new Strategy({usernameField: "email", passReqToCallback: true}, verifyRegister);
export const loginLocal = new Strategy({usernameField: "email"}, verifyLogin)
