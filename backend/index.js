import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

dotenv.config({});

const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);


app.get("/", (req, res) => {
  res.send("Main page");
});

app.listen(port, () => {
  connectDB();
  console.log(`server is running on port ${port}`);
});
