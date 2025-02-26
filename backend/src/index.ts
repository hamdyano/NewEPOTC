import express , {Request,Response}from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import newsRoute from "./routes/newsRoute";
import cookieParser from "cookie-parser";
import partnershipRoute from "./routes/partnershipRoute";
import photosRoute from "./routes/photosRoute";
import path from "path";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log("connected to database"));

const app = express();


app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


 

 app.use(
  cors({
      origin: "http://localhost:5173", // Allow frontend origin
      credentials: true, // Allow cookies and credentials
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);



app.use(express.static(path.join(__dirname, "../../frontend/dist")));




app.use("/api/auth", authRoute);
app.use("/api/users",userRoute)
app.use("/api/user-profile",authRoute)
app.use("/api/user-update",authRoute)
app.use("/api/news",newsRoute)
app.use("/api/partner",partnershipRoute)
app.use("/api/allphotos",photosRoute)



app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});


app.get("/health", async( req:Request,res:Response) => {
res.send({message:" healh ok "})
})



app.listen(8000, ()=> {
    console.log("server started on localhost :8000");
});








/*
app.use(
    session({
      secret: process.env.JWT_SECRET_KEY || "fallback_secret", // Load secret from .env
      resave: false,
      saveUninitialized: true,
      cookie: {
        sameSite: "none", 
        secure: true, // Required for SameSite="none" (must be HTTPS)
        httpOnly: true, // Prevent JavaScript access to cookies
      },
    })
  );*/
