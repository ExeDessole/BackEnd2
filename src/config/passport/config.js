import passport from "passport";
import { registerLocal, loginLocal } from "./localStrategy.js";
import userModel from "../../models/userModel.js";

const initializePAssport = () =>{
    passport.use("login", loginLocal);
    passport.use("register", registerLocal);
    passport.use("jwt");

    passport.serializeUser((user, done) =>{
    done(null, user.id)
    });
    
    passport.deserializeUser(async(id, done) => {
        const user = await userModel.findById(id);
        delete user.password;
        done(null, user)
    });
};

export default initializePAssport;