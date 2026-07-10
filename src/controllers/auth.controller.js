const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')

async function userRegister(req,res) {
    const{email,name,password}=req.body

    const isEmailExist=await userModel.findOne({
        email:email
    });

    if(isEmailExist){
        return res.status(422).json({
            message:"User already exist with this email",
            status:"Failed"
        })
    }

    const user=await userModel.create({
       email,password,name
    })

    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    res.status(201).json({
        message:"User register successfully",
        user:{
            id:user._id,
            email:user.email,
            name:user.name,
            password:user.password
        }
    })
    
}

async function userLogin(req,res) {

    const{email,password}=req.body

    const user=await userModel.findOne({email:email})

    if(!user){
        return res.status(401).json({
            message:"Email or password is invalid"
        })
    }
    const isValidPassword=await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(401).json({
            message:"Email or password is invalid"
        })
    }

    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    res.status(200).json({
        message:"User Login successfully",
        user:{
            id:user._id,
            email:user.email,
            name:user.name,
            password:user.password
        },
        token
    })
    
}

module.exports={userRegister,userLogin}