import { Router } from "express";
import * as UserRegisterController from "../controllers/userRegisterControllers.js";
import authMiddlewere from "../middleware/authMiddlewere.js";
import { registerValid, loginValid } from "../validations/validations.js";
import validationsHandErr from "../middleware/validationsHandErr.js";

const router = new Router();

router.post(
  "/registration",
  registerValid,
  validationsHandErr,
  UserRegisterController.registration
);
router.post(
  "/login",
  loginValid,
  validationsHandErr,
  UserRegisterController.login
);

router.get("/auth/me", authMiddlewere, UserRegisterController.check);

export default router;