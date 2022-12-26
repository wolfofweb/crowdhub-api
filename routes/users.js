import Express from "express";
import { getUser, updateUser, searchUser,getNews } from "../controllers/user.js";

const router = Express.Router()

router.get("/find/:userId", getUser)
router.get("/search/", searchUser)
router.get("/news/", getNews)
router.put("/", updateUser)


export default router
