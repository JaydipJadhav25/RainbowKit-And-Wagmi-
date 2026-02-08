import express from "express"
import cors from "cors"
import cookieParser  from "cookie-parser"
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js"




const app = express();
const PORT = 3000;



// DB Connection
const connectDB = async () => {
    try {
      
        await mongoose.connect("mongodb://localhost:27017/DApp");
        console.log("✅ MongoDB Connected: DApp");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};


// Trust proxy (Required for Render/Heroku SSL termination)
app.set('trust proxy', 1);


//middlerawre congih
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));
app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(cookieParser());







app.get("/" , (req , res)=>{

     return res.send("<h1>This is server side of DApp !</h1>")
})



app.use("/api/auth" , userRouter);









// Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});

