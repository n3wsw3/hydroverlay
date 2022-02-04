import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

import mongoose from "mongoose";
import { SensorData } from "./models/SensorData";

import path from "path";
require("dotenv").config({ path: path.resolve(process.cwd(), "../.env") });

import SerialPort, { parsers } from "serialport";
const { Readline } = parsers;

const serialPort = new SerialPort("/dev/ttyACM0", {
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
});

const lineStream = serialPort.pipe(
  new Readline({ delimiter: "\n", includeDelimiter: false })
);

lineStream.on("data", async (line) => {
  console.log(line);
  try {
    let sensorData = JSON.parse(line);
    const sd = await new SensorData(sensorData).save();
    io.emit("update", sd.toJSON());
  } catch {}
});

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

io.on("connection", async (socket: any) => {
  const latest = (await SensorData.find().sort({ createdAt: -1 }).limit(1))[0];
  socket.emit("update", latest);
  console.log("a user connected");
});

server.listen(process.env.API_PORT || 8000, async () => {
  await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost/hydro");
  console.log(`Server running on: ${process.env.API_PORT || 8000}`);
});
