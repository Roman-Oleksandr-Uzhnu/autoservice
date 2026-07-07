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

serviceSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());

  if (doc) {
    const OrderItem = mongoose.model("OrderItem");
    const Order = mongoose.model("Order");

    const affectedOrders = await OrderItem
      .find({ service: doc._id })
      .distinct("order");

    await OrderItem.deleteMany({
      service: doc._id,
    });

    for (const orderId of affectedOrders) {
      const left = await OrderItem.countDocuments({
        order: orderId,
      });

      if (left === 0) {
        await Order.deleteOne({
          _id: orderId,
        });
      }
    }
  }

  next();
});

export default mongoose.models.Service ||
  mongoose.model("Service", serviceSchema);