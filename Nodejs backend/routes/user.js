const express=require("express");
const router=express.Router();

const {signup,signin,signout,list,requireSignin}=require("../controller/user");

router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signout);
router.get("/users/:id",requireSignin,list);


module.exports=router;