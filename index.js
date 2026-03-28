const express=require("express")
const app=express();
const mongoose=require("mongoose");
const userRouter=require("./routers/user.router");
const authRouter=require("./routers/auth.router");
const dotenv=require("dotenv");
const listingRouter=require('./routers/listing.router');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
dotenv.config();
const PORT = process.env.PORT || 3000;
// mongoose.connect("mongodb+srv://meerabshahid270_db_user:m3hUumpcwVGE7OVk@cluster0.rpk2uw0.mongodb.net/?appName=Cluster0")
// mongoose.connect("mongodb://127.0.0.1:27017/mern-estate") -------->local compass
mongoose.connect(process.env.MONGO)
.then(()=> console.log("Connected to MongoDb"))
.catch((err)=> console.log(err));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.get("/api/test", (req, res) => {
  res.send("API working 🚀");
});

app.use((err, req, res, next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
    
});
// For serverless deployment on Vercel export a handler, but keep a
// local listener for development so `npm run dev` still serves requests.
const serverless = require('serverless-http');

if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    module.exports = serverless(app);
} else {
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
    module.exports = app;
}