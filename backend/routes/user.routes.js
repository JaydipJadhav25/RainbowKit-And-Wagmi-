import {Router} from "express"
import { completeProfile, getUserNonce, getUserProfile, logout, userVerifyMessage } from "../controller/user.controller.js";
import { useAuth } from "../middlewares/auth.js";


const router = Router();

router.get("/" , (req, res) =>{
    return res.send("<h1>This is user router!</h1>") 
});



//nonce
router.post("/nonce" , getUserNonce);
//verify 
router.post("/verify" , userVerifyMessage );


router.get("/me" , useAuth ,getUserProfile);

router.post("/complete-profile" , useAuth , completeProfile)
router.get("/logout" , useAuth , logout);


export default router;