import { Router } from "express";
import userRegisterRouter from "./userRegisterRouter.js";
import userPostRouter from "./userPostRouter.js";
import postsRouters from "./postsRouters.js"

const router = new Router();

router.use("/user", userRegisterRouter);
router.use('/posts', postsRouters);

export default router;
