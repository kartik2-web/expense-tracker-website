* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", system-ui, sans-serif;
}

body {
  background: linear-gradient(135deg, #020617, #020617);
  color: #e5e7eb;
  min-height: 100vh;
}

/* ---------- AUTH PAGES ---------- */
form {
  background: #020617;
  border: 1px solid #1f2937;
  width: 100%;
  max-width: 380px;
  margin: 80px auto;
  padding: 28px;
  border-radius: 16px;
}

form h2 {
  text-align: center;
  margin-bottom: 20px;
}

input,
select {
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  border-radius: 10px;
  background: #020617;
  border: 1px solid #1f2937;
  color: white;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  opacity: 0.9;
}

a {
  color: #60a5fa;
  text-decoration: none;
}

/* ---------- DASHBOARD ---------- */
.dashboard {
  max-width: 1000px;
  margin: auto;
  padding: 30px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.logout-btn {
  width: auto;
  padding: 8px 14px;
  background: #dc2626;
}

/* ---------- SUMMARY ---------- */
.summary-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 30px;
}

.summary-card {
  padding: 20px;
  border-radius: 14px;
  background: #020617;
  border: 1px solid #1f2937;
}

.summary-card h4 {
  margin-bottom: 6px;
  color: #9ca3af;
}

.summary-card p {
  font-size: 1.5rem;
  font-weight: bold;
}

.income {
  border-left: 4px solid #22c55e;
}

.expense {
  border-left: 4px solid #ef4444;
}

.balance {
  border-left: 4px solid #3b82f6;
}

/* ---------- TRANSACTIONS ---------- */
.transaction {
  background: #020617;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction span {
  opacity: 0.9;
}

.transaction button {
  width: auto;
  background: transparent;
  color: #ef4444;
}
