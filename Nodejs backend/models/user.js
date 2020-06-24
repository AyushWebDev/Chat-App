const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    hashedPassword:{
        type: String,
        trim: true,
        required: true
    }
})
userSchema.virtual("password")
    .set(function(password){
        this._password=password;
        this.hashedPassword=this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods={
    encryptPassword: function(password){
        if(!password)
            return "";
        try{
            return crypto.createHash("sha1")
                    .update(password)
                    .digest("hex");
        }
        catch(err)
        {
            return "";
        }
    },
    authenticate: function(plainText){
        return this.encryptPassword(plainText)===this.hashedPassword
    }

    
}

module.exports=mongoose.model("User",userSchema);
    