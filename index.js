const express=require("express")
const app=express();
const mongoose=require("mongoose");
const userRouter=require("./routers/user.router");
const authRouter=require("./routers/auth.router");
const dotenv=require("dotenv");
const listingRouter=require('./routers/listing.router');
const cookieParser = require("cookie-parser");
const cors = require('cors');

dotenv.config();


app.use(cors({
  origin: [
    'https://mern-estate-frontend-blush.vercel.app', 
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

// MongoDB Connection
mongoose.connect(process.env.MONGO)
.then(()=> console.log("Connected to MongoDb"))
.catch((err)=> console.log(err));

// mongoose.connect("mongodb+srv://meerabshahid270_db_user:m3hUumpcwVGE7OVk@cluster0.rpk2uw0.mongodb.net/?appName=Cluster0")
// mongoose.connect("mongodb://127.0.0.1:27017/mern-estate") -------->local compass


// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.get("/", (req, res) => {
  res.send("API working 🚀");
});


// Error Handler
app.use((err, req, res, next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"Internal server error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
    
});
// 
  // Server
  const PORT = process.env.PORT || 3000;
  // if (process.env.NODE_ENV === 'development') {
  //   app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
  // }

  // // Export a Vercel-compatible handler (and for other serverless platforms)
  // module.exports = (req, res) => app(req, res);
  app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`));