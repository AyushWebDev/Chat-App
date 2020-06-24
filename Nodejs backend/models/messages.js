const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

const messageSchema=new mongoose.Schema({
            text: String,
            created: {
                type: Date,
                default: Date.now
            },
            postedBy:{
                type: ObjectId,
                ref: "User"
            },
            postedTo:{
                type: ObjectId,
                ref: "User"
            }
})

module.exports=mongoose.model("Message",messageSchema);