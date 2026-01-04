import "../styles/transactions.css";

export default function TransactionList({ transactions, onDelete, onEdit }) {
  return (
    <div className="transactions">
      <h3>History</h3>

      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className={tx.type === "income" ? "income-item" : "expense-item"}
            >
              <div>
                <strong>{tx.category}</strong>
                <p className="tx-date">{tx.date}</p>
              </div>

              <span>
                {tx.type === "income" ? "+" : "-"} ₹{tx.amount}
              </span>

              <div>
                <button className="edit-btn" onClick={() => onEdit(tx)}>
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(tx.id)}
                  
                >
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
