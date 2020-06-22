const express=require("express");
const router=express.Router();

const {signup,signin,signout}=require("../controller/user");

router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signout);

module.exports=router;