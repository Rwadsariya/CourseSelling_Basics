const { Router } = require("express");
const bcrpyt = require("bcrypt");
const { z } = require("zod");
const jwt = require("jsonwebtoken");

const userRouter = Router();
const { userModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

const { JWT_TOKEN_SECRET } = require("../config");


userRouter.post("/signup", async (req, res) => {
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
    const user = await userModel.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });
  } catch (err) {
    errorThrown = true;
    res.json({
      message: "User already exists",
    });
  }

  if (!errorThrown) {
    res.json({
      message: "User created successfully",
    });
  }
});

userRouter.post("/signin", async(req, res) => {
  const { email, password } = req.body;
  

  const user = await userModel.findOne({
    email,
  });

  const passwordMatch = await bcrpyt.compare(password,user.password)
  if (!passwordMatch) {
    res.json({
      message: "Invalid Credentials",
    })
    return;
  }else{
    const token = jwt.sign({
      id: user._id
    },JWT_TOKEN_SECRET)

    res.json({
      message: "User signed in successfully"+token,
    })
  }
});

userRouter.post("/purchases", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const purchases = await purchaseModel.find({
      userId
    })

    res.json({
      courses: purchases
    })
});



module.exports = {
  userRouter,
};
