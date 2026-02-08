import {Router} from "express"
import { getUserNonce } from "../controller/user.controller.js";


const router = Router();

router.get("/" , (req, res) =>{
    return res.send("<h1>This is user router!</h1>") 
});



//nonce
router.post("/nonce" , getUserNonce);


export default router;