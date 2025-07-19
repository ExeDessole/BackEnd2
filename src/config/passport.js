import passport from "passport";
import { registerLocal, loginLocal } from "./strategies/localStrategy.js";
import { jwtStrategy } from "./strategies/jwtStrategy.js";
import userModel from "../DAOS/mongo/models/userModel.js";


const initializePAssport = () =>{
  passport.use("login", loginLocal);
  passport.use("register", registerLocal);
  passport.use("jwt", jwtStrategy);

  passport.serializeUser((user, done) => {
    console.log("✅ SERIALIZE:", user._id);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id).lean(); // o sin .lean() si preferís
      if (!user) return done(null, false);
      delete user.password;
      console.log("🔁 DESERIALIZE:", user);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default initializePAssport;