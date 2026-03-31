const express=require("express")
const app=express();
const mongoose=require("mongoose");
const userRouter=require("./routers/user.router");
const authRouter=require("./routers/auth.router");
const dotenv=require("dotenv");
const listingRouter=require('./routers/listing.router');
const cookieParser = require("cookie-parser");
app.use(cors());

dotenv.config();

// const cors = require('cors');
// // ✅ CORS CONFIG (FINAL)
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     if (
//       origin.includes("vercel.app") ||
//       origin === "http://localhost:5173"
//     ) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

// // 🔥 USE CORS (ONLY ONCE)
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));


app.use(cors({
  origin: [
    'https://mern-estate-frontend-blush.vercel.app', 
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// mongoose.connect("mongodb+srv://meerabshahid270_db_user:m3hUumpcwVGE7OVk@cluster0.rpk2uw0.mongodb.net/?appName=Cluster0")
// mongoose.connect("mongodb://127.0.0.1:27017/mern-estate") -------->local compass

// Middlewares
app.use(cookieParser());
app.use(express.json());
// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.get("/", (req, res) => {
  res.send("API working 🚀");
});
// MongoDB Connection
mongoose.connect(process.env.MONGO)
.then(()=> console.log("Connected to MongoDb"))
.catch((err)=> console.log(err));

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
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
module.exports=app;