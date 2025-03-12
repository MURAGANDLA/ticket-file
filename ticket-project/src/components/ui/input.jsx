import React from "react";

const Input = ({ value, onChange, placeholder, className }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-2 py-1 rounded ${className}`}
    />
  );
};

export default Input;
