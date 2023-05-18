import { Router } from "express";
import UserRegisterController from "../controllers/userRegisterControllers.js";

const router = new Router()

const reg = new UserRegisterController()

router.post('/registration', reg.registration)
router.post('/login', reg.login)
router.get('/auth', reg.check)

export default router;

