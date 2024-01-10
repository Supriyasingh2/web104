const express=require("express")
const {UserModel}=require("../model/user.model");
const {auth}=require("../middleware/auth.middleware");

const bcrypt=require("bcrypt")
const jwt= require("jsonwebtoken")
const {blacklist}=require("../blacklist")
//registration
//registration using hashing
const userRouter=express.Router()
userRouter.post("/register",(req,res)=>{
        const {name,email,age,password}=req.body
        try{
                bcrypt.hash(password, 5, async(err, hash)=> {
                        if(err){
                                res.status(200).json({error:err})
                        }else{
                                const user=new UserModel({name,email,age,password:hash})
                                await user.save()
                                res.status(200).json({msg:"the new user has been registered"})
                        }
                    });
        }catch(err){
                res.status(400).json({error:err})
        }
})

//login
/*
userRouter.post("/login",async(req,res)=>{
        const {email,password}=req.body
        try{
        const user=await UserModel.findOne({email:email,password:password})
        if(user){
        res.status(200).json({msg:"Login successfully"})
        }else{
                res.status(200).json({msg:"Please register ,wrong credential"})
        }
}catch(err){
        res.status(400).json({error:err})
}
})
*/
//login using hashing
userRouter.post("/login",async(req,res)=>{
        const {email,password}=req.body
        try{
        const user=await UserModel.findOne({email})
                bcrypt.compare(password, user.password, (err, result) =>{
                        if(result){
                                const token=jwt.sign({userID:user._id,user:user.name},"masai")
                                //const refresh_token=jwt.sign({userID:user._id,user:user.name},"school")
                        res.status(200).json({msg:"Login successfully", token})
                }else{
                        res.status(200).json({msg:"Please register ,wrong credential"})
                }
                    })
}catch(err){
        res.status(400).json({error:err})
}
})
//logout

userRouter.get("/logout",(req,res)=>{
        const token =req.headers.authorization?.split(" ")[1]
        try{
                blacklist.push(token)
                res.status(200).json({msg:"you have been logged out!"})
        }catch(err){
                res.status(400).json({error:err})
        }
})

module.exports={
        userRouter
}

