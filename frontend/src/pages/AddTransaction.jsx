import { useEffect, useState } from "react";
import api from "../api/api";
import ExpenseCharts from "../components/ExpenseCharts";

export default function AddTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/expenses");
      setTransactions(res.data);
    } catch (err) {
      alert("Failed to fetch transactions");
    }
  };

  const addTransaction = async () => {
    if (!amount || !category) {
      alert("Amount and category required");
      return;
    }

    await api.post("/expenses", {
      amount,
      type,
      category,
      date,
      description,
    });

    resetForm();
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await api.delete(`/expenses/${id}`);
    fetchTransactions();
  };

  const resetForm = () => {
    setAmount("");
    setType("expense");
    setCategory("");
    setDate("");
    setDescription("");
  };

  return (
    <div className="expenses-container">
      <h2>Add Transaction</h2>

      {/* FORM */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addTransaction}>Add Transaction</button>

      <hr />

      {/* TRANSACTION LIST */}
      {transactions.map((t) => (
        <div key={t._id} className="expense-card">
          <p>
            <strong>{t.type.toUpperCase()}</strong> – ₹{t.amount}
          </p>
          <p>{t.category}</p>
          <p>{t.date?.slice(0, 10)}</p>

          <button onClick={() => deleteTransaction(t._id)}>Delete</button>
        </div>
      ))}

      {/* CHARTS */}
      <ExpenseCharts expenses={transactions} />
    </div>
  );
}
