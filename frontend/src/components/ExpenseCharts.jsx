import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function ExpenseCharts({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return <p style={{ marginTop: "20px" }}>No data for charts</p>;
  }

  // PIE CHART (only expenses)
  const categoryTotals = {};
  expenses.forEach((e) => {
    if (e.type === "expense") {
      categoryTotals[e.category] =
        (categoryTotals[e.category] || 0) + Number(e.amount);
    }
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#4eaaff",
          "#ff7675",
          "#55efc4",
          "#ffeaa7",
          "#a29bfe",
        ],
      },
    ],
  };

  // BAR CHART
  let income = 0;
  let expense = 0;
  expenses.forEach((e) => {
    if (e.type === "income") income += Number(e.amount);
    else expense += Number(e.amount);
  });

  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [income, expense],
        backgroundColor: ["#2ecc71", "#e74c3c"],
      },
    ],
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Category-wise Expenses</h3>
      {Object.keys(categoryTotals).length > 0 ? (
        <Pie data={pieData} />
      ) : (
        <p>No expense data</p>
      )}

      <h3 style={{ marginTop: "40px" }}>Income vs Expense</h3>
      <Bar data={barData} />
    </div>
  );
}
