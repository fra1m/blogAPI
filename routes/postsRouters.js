import { Router } from "express";
import postControllers from "../controllers/postControllers.js";

const router = new Router()
const post = new postControllers()


router.get('/', post.get)
router.get('/:id', post.getId)
router.get('/post/new', post.postNew)

router.post('/', post.toPost)

router.delete('/:id', post.toDelete)

export default router;