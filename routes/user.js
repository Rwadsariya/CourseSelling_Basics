const { Router } = require('express');

const userRouter = Router();
const {userModel } = require("../db")

userRouter.post("/signup",(req,res)=>{
    res.json({
        message:"Hello World"
    })
})

userRouter.post("/signin",(req,res)=>{
    res.json({
        message:"Hello World"
    })
})

userRouter.post("/course",(req,res)=>{
    res.json({
        message:"Hello World"
    })
})

userRouter.get("/course/bulk",(req,res)=>{
    res.json({
        message:"Hello World"
    })
})

module.exports = {
    userRouter
}