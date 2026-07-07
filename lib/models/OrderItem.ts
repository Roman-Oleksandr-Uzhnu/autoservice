import mongoose, { Schema, model, models } from "mongoose";

const orderItemSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
      index: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },

    priceAtOrder: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem =
  models.OrderItem ||
  model("OrderItem", orderItemSchema);

export default OrderItem;