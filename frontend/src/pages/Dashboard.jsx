import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0
  });

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchTransactions();
      fetchSummary();
    }
  }, []);

  const fetchTransactions = async () => {
    const res = await API.get("/api/transactions");
    setTransactions(res.data);
  };

  const fetchSummary = async () => {
    const res = await API.get("/api/transactions/summary");
    setSummary(res.data);
  };

  const addTransaction = async (e) => {
    e.preventDefault();

    await API.post("/api/transactions", {
      title,
      amount: Number(amount), // ✅ FORCE NUMBER
      type,
      category,
      date
    });

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");

    fetchTransactions();
    fetchSummary(); // ✅ THIS WAS CRITICAL
  };

  const deleteTransaction = async (id) => {
    await API.delete(`/api/transactions/${id}`);
    fetchTransactions();
    fetchSummary();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Expense Tracker</h2>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="summary-container">
        <div className="summary-card income">
          <h4>Income</h4>
          <p>₹{summary.income}</p>
        </div>
        <div className="summary-card expense">
          <h4>Expense</h4>
          <p>₹{summary.expense}</p>
        </div>
        <div className="summary-card balance">
          <h4>Balance</h4>
          <p>₹{summary.balance}</p>
        </div>
      </div>

      <form className="add-form" onSubmit={addTransaction}>
        <h3>Add Transaction</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
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
          required
        />

        <button type="submit">Add Transaction</button>
      </form>

      {transactions.length === 0 && <p>No transactions yet</p>}

      {transactions.map((t) => (
        <div key={t._id} className="transaction">
          <span>
            {t.title} • ₹{t.amount} ({t.type})
          </span>
          <button onClick={() => deleteTransaction(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
