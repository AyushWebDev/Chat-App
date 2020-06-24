const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
mongoose.connect("mongodb://localhost:27017/chatapi",{ useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("DB connected");
})
mongoose.connection.on('error', err => {
    console.log('DB connection error :',err.message);
});

 app.use(bodyParser.json());
 app.use(cors());
// app.use('/',userRoutes);
// app.
const userRoutes=require("./routes/user");
const messageRoutes=require("./routes/messages");
app.use("/",userRoutes);
app.use("/",messageRoutes);

app.use(function(err,req,res,next){
    if(err.name==="UnauthorizedError"){
        res.status(401).json({
            error: "Unauthorised!!"
        });
    } 
});


app.listen(8000,()=>{
    console.log("Server is Running on Port 8000");
})
