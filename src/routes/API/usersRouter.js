import { Router } from "express";
import {
  createUser,
  getUserProfile,
} from "../../controlers/userController.js";

const userRouter = Router();

userRouter.post("/me", createUser)
userRouter.get("/me",  getUserProfile);

export default userRouter;