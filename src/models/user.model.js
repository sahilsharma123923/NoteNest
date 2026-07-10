const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"],
        trim:true,
        lowercase:true,
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address" ],
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"Password should contain more than 6 character"]
    }
},{
    timestamps:true
});

userSchema.pre("save",async function () {
    
    if(!this.isModified("password")){
        return;
    }
    const hash=await bcrypt.hash(this.password,10)
    this.password=hash;
    return;
})

userSchema.methods.comparePassword=async function (password){

    console.log(this.password,password);
  return await bcrypt.compare(password,this.password)

}


const userModel=mongoose.model("user",userSchema)

module.exports=userModel