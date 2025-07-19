import { Router } from "express";
import {
  createUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../../controlers/userController.js";

const userRouter = Router();

userRouter.post("/", createUser)
userRouter.get("/me",  getUserProfile);
userRouter.patch("/me", updateUserProfile);
userRouter.delete("/me", deleteUserAccount);

export default userRouter;