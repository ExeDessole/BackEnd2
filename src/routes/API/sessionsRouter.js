import { Router } from "express";
import passport from "passport";

const sessionsRouter = Router();

sessionsRouter.post(
    "/login",
    passport.authenticate("login",
        { successRedirect: "/profile",
          failureRedirect: "/failed"
        })
);

sessionsRouter.post(
    "/register",
    passport.authenticate("register",
        { successRedirect: "/profile",
          failureRedirect: "/failed"
        })
);

sessionsRouter.post("/logout", (req, res) =>{
    req.logout(err =>{
        if(err){
            console.log(err);
            return res.status(500).json({fatal_error: "view console"})
        }
        return res.redirect("/login")
    })
});


export default sessionsRouter;