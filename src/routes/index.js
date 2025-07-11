import { Router} from "express";
import viewsRouter from "./viewsRouter.js";
import sessionsRouter from "./sessionsRouter.js";
import usersRouter from "./usersRouter.js"
import adminRouter from "./admindRouter.js"

const router = Router();

router.use("/views", viewsRouter);
router.use("/session", sessionsRouter);
router.use("/user", usersRouter);
router.use("/admin", adminRouter);

export default router;