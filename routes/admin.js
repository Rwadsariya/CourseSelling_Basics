const { Router } = require('express');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const adminRouter = Router();
const { adminModel } = require("../db")

const JWT_ADMIN_TOKEN_SECRET = "adminfor1231"

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