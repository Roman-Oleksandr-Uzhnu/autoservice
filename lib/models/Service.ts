import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Назва обов'язкова"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Опис обов'язковий"],
    },
    price: {
      type: Number,
      required: [true, "Ціна обов'язкова"],
      min: 0,
    },
    icon: {
      type: String,
      default: "🔧",
    },
    category: {
      type: String,
      required: [true, "Категорія обов'язкова"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Service ||
  mongoose.model("Service", serviceSchema);