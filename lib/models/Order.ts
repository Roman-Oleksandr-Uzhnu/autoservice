import mongoose, { Schema, models, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Користувач обов'язковий"],
      index: true,
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "preparing",
        "ready",
        "completed",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    notes: {
      type: String,
      maxlength: 300,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Один користувач → багато замовлень
orderSchema.index({
  user: 1,
  createdAt: -1,
});

// Virtual: Order.items
orderSchema.virtual("items", {
  ref: "OrderItem",
  localField: "_id",
  foreignField: "order",
});

// Cascade delete OrderItem після видалення Order
orderSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());

  if (doc) {
    await mongoose
      .model("OrderItem")
      .deleteMany({ order: doc._id });
  }

  next();
});

const Order =
  models.Order || model("Order", orderSchema);

export default Order;