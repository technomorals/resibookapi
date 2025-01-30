const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Transaction Schema
const transactionSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    type: {
      type: String,
      enum: ["Income", "Expense", "Savings", "Investment"],
      required: true,
    },
    category: {
      type: String, // For Income, Expense, Savings, or Investment (e.g., Salary, Food, Emergency, Stock)
      required: function () {
        return this.type !== "Savings"; // Category is optional for Savings type
      },
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String, // Optional description of the transaction
      required: false,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
