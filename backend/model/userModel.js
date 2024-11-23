import mongoose from "mongoose";


const userSchema= new mongoose.Schema(
    {

        name:{
            type:String,
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        },

        email:{
            type:String
        },
        password:{
            type:String,

    }
},
    {
        timestamps:true
    }
)

const User=mongoose.model("User",userSchema);
export default User;