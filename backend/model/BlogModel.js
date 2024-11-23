import mongoose from "mongoose";


const blogSchema= new mongoose.Schema(
    {

        title:{
            type:String,
        },
        content:{
            type:String,
        },
       Description:{
            type:String
        }},

    {
        timestamps:true
    }
)

const Blog=mongoose.model("Blog",blogSchema);
export default Blog;