import {Router} from "express"
import { getUserNonce, getUserProfile, userVerifyMessage } from "../controller/user.controller.js";
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




export default router;