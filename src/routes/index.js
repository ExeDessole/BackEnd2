import { Router} from "express";
import sessionsRouter from "./API/sessionsRouter.js";
import usersRouter from "./API/usersRouter.js"
import adminRouter from "./API/admindRouter.js"
import productRouter from "./API/productRouter.js";

const api = Router();

api.use("/session", sessionsRouter);
api.use("/user", usersRouter);
api.use("/admin", adminRouter);
api.use("/tienda", productRouter);

export default api;