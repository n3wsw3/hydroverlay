import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import bp from "body-parser";
import mongoose from "mongoose";
import { SensorData } from "./models/SensorData";
require("dotenv").config({ path: path.resolve(process.cwd(), "../.env") });

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bp.json());

app.get("/hello", (req, res) => {
  res.send("HELLO WORLD!");
});

app.post("/update", async (req, res) => {
  const sd = await new SensorData(req.body).save();
  console.log(req.body);
  io.emit("update",sd.toJSON());
  res.send("SUCCESS");
})

io.on("connection", (socket: any) => {
  console.log("a user connected");
});

// setInterval(() => {
//   io.emit("update", "DATA UPDATED FROM WEBSERVER "+Math.floor(Math.random()*100));
// }, 2000);

server.listen(process.env.API_PORT || 8000, async () => {
  await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/hydro");
  console.log(`Server running on: ${process.env.API_PORT || 8000}`);
});
