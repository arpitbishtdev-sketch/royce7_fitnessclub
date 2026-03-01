import React from "react";
import "../style/Table.css";

export function TableSkeleton({ cols = 5, rows = 5 }) {
  return (
    <div className="table-skeleton">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="skeleton-row">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="skeleton-cell" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ icon = "📋", message = "No data found" }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <p className="empty-msg">{message}</p>
    </div>
  );
}

export default function Table({ columns, data, onRowAction, loading = false }) {
  if (loading) return <TableSkeleton cols={columns.length} />;
  if (!data || data.length === 0) return <EmptyState />;

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={col.width ? { width: col.width } : {}}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i} className="table-row">
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
