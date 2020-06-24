const express=require("express");
const router=express.Router();

const {postMessage,getMessages}=require("../controller/messages");
const {requireSignin}=require('../controller/user');

router.post("/postMessage",requireSignin,postMessage);
router.get("/getMessages/:from/:to",requireSignin,getMessages);

module.exports=router;