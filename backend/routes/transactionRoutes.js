const express = require("express");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Get all transactions
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ FIXED SUMMARY ROUTE
router.get("/summary", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user });

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      const amount = Number(t.amount); // ✅ FORCE NUMBER

      if (t.type === "income") {
        income += amount;
      } else {
        expense += amount;
      }
    });

    res.json({
      income,
      expense,
      balance: income - expense
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add transaction
router.post("/", auth, async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      amount: Number(req.body.amount), // ✅ FORCE NUMBER
      user: req.user
    });

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete transaction
router.delete("/:id", auth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ msg: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
