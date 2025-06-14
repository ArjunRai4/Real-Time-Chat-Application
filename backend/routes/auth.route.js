import express from "express";
import { login, logout, signup, onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router=express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
//why do we use post in logout and not get as we are not sending anything
//reason:post method is used on operations that changed the server state and logging out does that

router.post("/onboarding",protectRoute,onboard);//protectRoute provides authorization

//checks if user is authenticated/logged in or not
router.get("/me",protectRoute,(req,res)=>{
  res.status(200).json({success:true,user:req.user});
})

export default router;