import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req,res){
    const {email,fullName,password}=req.body;

    try{
        if(!email || !password || !fullName){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }

        const exisitingUser=await User.findOne({email});
        if(exisitingUser){
            return res.status(400).json({message:"Email already exists,please use a different one"});
        }

        const idx=Math.floor(Math.random()*100)+1;//generates a random number between 1-100
        const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`;//this api has 100 faces indexed from 1-100,so we generate a random face

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        });

        const token = jwt.sign(
            { userId: newUser._id }, 
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
        );


        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,  //prevents XSS attacks,
            sameSite:"Strict",  //prevents CSRF attacks
            secure:process.env.NODE_ENV==="production"
        })

        res.status(201).json({success:true,user:newUser})
    } catch (error) {
        console.log("Error in signup controller",error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export async function login(req,res){
    res.send("Login Route");
}

export async function logout(req,res){
    res.send("Logout Route");
}