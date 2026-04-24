import express from "express";
import "dotenv/config"
import  cors  from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
// importing local user router
import userRouter from "./routes/user.routes.js";

// create express app and HTTP server
const app = express();
const server = http.createServer(app);

// middleware setup
app.use(express.json({ limit: "4kb" }));
app.use(cors());

// route setup
app.use("/api/status", (req, res) => res.send("Server is live"))
app.use("/api/auth", userRouter);

// connect to mongoDB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on PORT:" + PORT));
