const { Router } = require("express");

const courseRouter = Router();

const {courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");


courseRouter.get("/preview",async(req,res)=>{

    const courses = await courseModel.find({});

    res.json({
        courses: courses
    })
})

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    const {userId, courseId} = req.body;

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message:"You have successfuly bought the course!!"
    })
})

module.exports = {
    courseRouter
}