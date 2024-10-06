const { Router } = require('express');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const adminRouter = Router();
const { adminModel, courseModel } = require("../db")
const { adminMiddleware } = require("../middleware/admin")

const { JWT_ADMIN_TOKEN_SECRET } = require("../config");

adminRouter.post("/signup", async (req, res) => {
    const rqBody = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        firstname: z.string(),
        lastname: z.string(),
      });
      const validated = rqBody.safeParse(req.body);
    
      if (!validated.success) {
    
        res.status(400).json({
          message: "Invalid Input, error"+ validated.error,
        });
        return;
      }
      const email = req.body.email;
      const password = req.body.password;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
    
      const hashedPassword = await bcrpyt.hash(password, 5);
      console.log(hashedPassword);
    
      let errorThrown = false;
    
      try {
        const admin = await adminModel.create({
          email,
          password: hashedPassword,
          firstname,
          lastname,
        });
      } catch (err) {
        errorThrown = true;
        res.json({
          message: "admin already exists",
        });
      }
    
      if (!errorThrown) {
        res.json({
          message: "admin created successfully",
        });
      }
})

adminRouter.post("/signin", async(req,res)=>{
    const { email, password } = req.body;
  

    const admin = await adminModel.findOne({
      email,
    });
  
    const passwordMatch = await bcrpyt.compare(password,admin.password)
    if (!passwordMatch) {
      res.json({
        message: "Invalid Credentials",
      })
      return;
    }else{
      const token = jwt.sign({
        id: admin._id
      },JWT_ADMIN_TOKEN_SECRET)
  
      res.json({
        message: "admin signed in successfully"+token,
      })
    }
})

adminRouter.get("/course/bulk",adminMiddleware, async (req,res)=>{
    res.json({
        message:"Hello World"
    })
})

adminRouter.post("/course",adminMiddleware, async (req,res)=>{
    const adminId = req.userId

    const {title,description,price,imgUrl } = req.body;

    await courseModel.create({
        title,
        description,
        price,
        imgUrl,
        creatorId: adminId
    })

    res.json({
        message:"Course created successfully by admin"
    })
})

adminRouter.put("/course",adminMiddleware, async (req,res)=>{

})


module.exports = {
    adminRouter
}