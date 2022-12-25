import Express from "express";
import { getComments, addComment, getCommentsCount } from "../controllers/comment.js";

const router = Express.Router()

router.get("/", getComments)
router.get("/count/", getCommentsCount)
router.post("/", addComment)



export default router