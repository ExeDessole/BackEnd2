import passport from "passport";
import { registerLocal, loginLocal } from "./localStrategy.js";

const initializePAssport = () =>{
    passport.use("login", loginLocal);
    passport.use("register", registerLocal);
    passport.use("jwt");
    passport.use("");
};
export default initializePAssport;