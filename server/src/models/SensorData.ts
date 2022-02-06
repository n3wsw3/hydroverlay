import mongoose from "mongoose";

interface SensorData {
  waterLevel: number;
  temperature: number;
  ec: number;
  ph: number;
  time: number;
}

export interface SensorDataObj extends SensorData{
  createdAt: string,
  updatedAt: string,
  _id: string,
  __v: number
}

const SensorDataSchema = new mongoose.Schema<SensorData>(
  {
    waterLevel: Number,
    temperature: Number,
    ec: Number,
    ph: Number,
  },
  { timestamps: true }
);

export const SensorData = mongoose.model("SensorData", SensorDataSchema);
