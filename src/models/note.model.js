const mongoose=require('mongoose');


const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required for creating notes"]
    },
    content:{
        type:String,
        required:[true,"content is required for creating notes"],
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    }
},{
    timestamps:true
})

const noteModel=mongoose.model("note",noteSchema)

module.exports=noteModel