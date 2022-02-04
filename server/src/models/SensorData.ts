import mongoose from "mongoose";

interface SensorData {
  waterLevel: number;
  temperature: number;
  ec: number;
  ph: number;
  time: number;
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
