const Message=require("../models/messages");
const User=require("../models/user");

exports.postMessage=(req,res)=>{
    let msg=new Message();
    
    msg.postedBy=req.body.postedBy;
    msg.postedTo=req.body.postedTo;
    msg.text=req.body.text;
    
    msg.save()
    .then(m=>{
            return res.json(m);
    })
    .catch(err=>{console.log(err)})
    
}
exports.getMessages=(req,res)=>{
     //Message.find({postedBy: req.params.from,postedTo: req.params.to})
     Message.find({
         $or:[
             {$and:[{postedBy: req.params.from},{postedTo: req.params.to}]},
             {$and:[{postedBy: req.params.to},{postedTo: req.params.from}]}
         ]
     })
    .populate("postedBy")
    .populate("postedTo")
    .sort({created: 1})
    .then(msg=>{
        return res.status(200).json(msg);
    })
    .catch(err=>{
       console.log(error);
    })
    
}