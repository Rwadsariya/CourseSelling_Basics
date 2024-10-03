const { Router } = require('express');

const adminRouter = Router();
const { adminModel } = require("../db")

adminRouter.post("/signup",(req,res)=>{
    res.json({
        message:"Hello World"
    })
})

adminRouter.post("/signin",(req,res)=>{
    res.json({
        message:"Hello World"
    })
})

adminRouter.get("/bulk",(req,res)=>{
    res.json({
        message:"Hello World"
    })
})

adminRouter.post("/",(req,res)=>{
    res.json({
        message:"Hello World"
    })
})

adminRouter.put("/",(req,res)=>{
    res.json({
        message:"Hello World"
    })
})


module.exports = {
    adminRouter
}