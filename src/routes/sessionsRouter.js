import { Router } from "express";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post("login", passport.authenticate("login") =>{

});
sessionsRouter.post("register", passport.authenticate("register", {successRedirect: "profile", failureRedirect: "failed"}) =>{

});
sessionsRouter.post("logout", passport.authenticate("logout") =>{

});

export default sessionsRouter;