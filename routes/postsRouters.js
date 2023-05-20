import { Router } from "express";
import * as postControllers from "../controllers/postControllers.js";
import { postCreateValid } from "../validations/validations.js";
import authMiddlewere from "../middleware/authMiddlewere.js";
import validationsHandErr from "../middleware/validationsHandErr.js";

const router = new Router();

router.get("/", postControllers.get);
router.get("/:id", postControllers.getOne);

router.patch(
  "/:id",
  authMiddlewere,
  postCreateValid,
  validationsHandErr,
  postControllers.update
);

router.post(
  "/",
  authMiddlewere,
  postCreateValid,
  validationsHandErr,
  postControllers.create
);

router.delete("/:id", authMiddlewere, postControllers.remove);

export default router;
