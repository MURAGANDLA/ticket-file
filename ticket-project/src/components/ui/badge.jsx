import React from "react";

const Badge = ({ children, variant }) => {
  const color = variant === "destructive" ? "bg-red-500 text-white" : "bg-gray-300 text-black";
  return <span className={`px-2 py-1 rounded ${color}`}>{children}</span>;
};

export default Badge;
