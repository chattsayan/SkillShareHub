import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routers
import userRouter from "./routes/userRouter.js";
import courseRouter from "./routes/courseRouter.js";
import mediaRouter from "./routes/mediaRouter.js";

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Allow preflight
// app.options("*", cors());

// Middleware
app.use(express.json());
app.use(cookieParser());

// ----- API Routes -----
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);

// ----- CONNECT TO DATABASE -----
connectDB()
  .then(() => {
    console.log("DB Connection Established...");

    // ----- LISTENING TO SERVER -----
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is successfully listening to port ${process.env.PORT}...`
      );
    });
  })
  .catch((err) => {
    console.error("DB Connection Failed: ", err);
  });
