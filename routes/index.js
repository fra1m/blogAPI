import { Router } from "express";
import multer from "multer";
import userRegisterRouter from "./userRegisterRouter.js";
import postsRouters from "./postsRouters.js";
import authMiddlewere from "../middleware/authMiddlewere.js";

const router = new Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.use("/user", userRegisterRouter);
router.use("/posts", postsRouters);

router.post("/uploads", authMiddlewere, upload.single("static"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

export default router;
