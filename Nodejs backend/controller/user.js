const User=require("../models/user");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const expressJwt=require('express-jwt');
dotenv.config();


exports.signup=(req,res)=>{
    const userExist=User.findOne({email: req.body.email})
    .then(u=>{
        if(!u)
        {
            const user=new User(req.body);
            user.save()
            .then(u=>{
               return res.status(200).json(u);
            })
           
        }
        else{
            return res.status(400).json({
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

        return res.status(200).json({
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

exports.list=(req,res)=>{
    User.find({_id: {$ne: req.params.id}})
    .select("name email")
    .then(u=>{
        return res.json(u);
    })
    .catch(err=>{
        return res.json({error: err})
    })
    
}

exports.requireSignin=expressJwt({
    secret: process.env.JWT_SECRET,//user is authenticated if they are sending token which contain this secret
    //if the token is valid ,express jwt appends the verified user id 
    //in an auth key to request object
    userProperty: "auth"
});



