const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { userRouter} = require("./routes/user")
const { courseRouter} = require("./routes/course")
const { adminRouter} = require('./routes/admin')

const app = express();


mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());

app.use(express.json())

app.use("/user", userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);


app.listen(3000);

