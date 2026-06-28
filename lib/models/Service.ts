import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Назва послуги обов'язкова"],
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Ціна обов'язкова"],
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "🔧",
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