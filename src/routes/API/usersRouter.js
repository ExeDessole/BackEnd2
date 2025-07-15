import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} from "../../controllers/userController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.get("/me", authMiddleware, getUserProfile);
userRouter.patch("/me", authMiddleware, updateUserProfile);
userRouter.delete("/me", authMiddleware, deleteUserAccount);

export default userRouter;