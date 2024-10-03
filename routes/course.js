const { Router } = require("express");

const courseRouter = Router();

const {courseModel } = require("../db")


courseRouter.get("/preview",(req,res)=>{
    res.json({
        message:"Hello World"
    })
})

courseRouter.post("/purchase",(req,res)=>{
    res.json({
        message:"done!!"
    })
})

module.exports = {
    courseRouter
}