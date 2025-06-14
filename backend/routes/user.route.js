import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMyFriends, getRecommendedUser } from "../controllers/user.controller.js";

const router=express.Router()

router.use(protectRoute);//apply to all the routes in this file

router.get("/",getRecommendedUser)
router.get("/friends",getMyFriends)

export default router;