import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


export const register = async(req,res)=>{
    const {email, password} = req.body;
    try {
        const hashedPassword =  await bcrypt.hash(password,12);
        const user = await prisma.user.create({
            data:{
                email,
                password: hashedPassword
            }
        })
        res.status(200).json({message:"User registered successfully", user})
    } catch (error) {
        res.status(400).json({error:"User already exist."})
    }
}

export const login = async(req,res)=>{
    const {email, password}=req.body;
    try {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            res.status(404).json({error: "User not found."})
        }
        const isCorrectPassword = bcrypt.compare(password, user.password)
        if(!isCorrectPassword){
            res.status(401).json({error: "Invalid credential."})
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
        // const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET,{expiresIn: "1h"})
        console.log(token)
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({error: "Something went wrong."})
    }
}
