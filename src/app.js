require('dotenv').config();
const express=require('express');
const cookieParser=require('cookie-parser')
const authRouter=require('./routes/auth.route')
const noteRouter=require('./routes/notes.route')

const app=express();
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/notes",noteRouter);

module.exports=app