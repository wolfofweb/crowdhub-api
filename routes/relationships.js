import Express from "express";
import { getRelationships, addRelationship, deleteRelationship, getFollowing, getFollower } from "../controllers/relationship.js";

const router = Express.Router()

router.get("/", getRelationships)
router.post("/", addRelationship)
router.delete("/", deleteRelationship)
router.get("/following/", getFollowing)
router.get("/follower/", getFollower)


export default router