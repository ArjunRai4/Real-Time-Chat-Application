import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriendRequest, getMyFriends, getRecommendedUser, sendFriendRequest } from "../controllers/user.controller.js";

const router=express.Router()

router.use(protectRoute);//apply to all the routes in this file

router.get("/",getRecommendedUser)
router.get("/friends",getMyFriends)

router.post("/friend-request/:id",sendFriendRequest);
router.post("/friend-request/:id/accept",acceptFriendRequest);


export default router;