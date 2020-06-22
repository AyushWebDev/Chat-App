const User=require("../models/user");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();


exports.signup=(req,res)=>{
    const userExist=User.findOne({email: req.body.email})
    .then(u=>{
        if(!u)
        {
            const user=new User(req.body);
            user.save()
            .then(u=>{
                res.status(200).json(u);
            })
           
        }
        else{
            res.status(400).json({
                error: "Email Already Exist"
            }) 
        }
    })
    
    
}

exports.signin=(req,res)=>{
    User.findOne({email: req.body.email})
    .then(u=>{
        if(!u)
        {
            return res.status(400).json({
                error: "Account with that Email doesn't exist"
            })
        }
        
        if(!u.authenticate(req.body.password))
        {
            return res.status(400).json({
                error: "Email and Password doesn't match"
            })
        }

        const token=jwt.sign({_id: u._id},process.env.JWT_SECRET);
        res.cookie("t",token,{expire: new Date()+9999})

        res.status(200).json({
            user: u,
            token,
            msg: "signed in succesfully"
        })
    })
    
    
}
exports.signout=(req,res)=>{
    res.clearCookie("t");
    return res.json({
        msg: "signout success"
    });
};