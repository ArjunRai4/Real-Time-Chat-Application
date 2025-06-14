import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "../routes/auth.route.js"
import { connectDB } from "../lib/db.connection.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT:${PORT}`);
    connectDB();
})