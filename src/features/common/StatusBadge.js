import React from "react";

const statusColors = {
  pending: "bg-purple-200 text-purple-600",
  dispatched: "bg-yellow-200 text-yellow-600",
  delivered: "bg-green-200 text-green-600",
  cancelled: "bg-red-200 text-red-600",
  default: "bg-gray-200 text-gray-600",
};

function StatusBadge({ status }) {
  const badgeClass = statusColors[status] || statusColors.default;

  return (
    <span className={`${badgeClass} py-1 px-3 rounded-full text-xs`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default StatusBadge;
