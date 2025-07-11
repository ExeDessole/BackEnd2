import passport from "passport";
import { registerLocal, loginLocal } from "./strategies/localStrategy.js";
import { jwtStrategy } from "./strategies/jwtStrategy.js";
import userModel from "../DAOS/mongo/models/userModel.js";


const initializePAssport = () =>{
    passport.use("login", loginLocal);
    passport.use("register", registerLocal);
    passport.use("jwt", jwtStrategy);

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