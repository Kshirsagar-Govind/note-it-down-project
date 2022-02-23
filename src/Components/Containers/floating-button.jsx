import React, { Component } from "react";

const FloatingButton = ({ text, callback, style }) => {
  return (
    <div className="floting-button">
      <button onClick={callback} className="add-something-button">
        <span>{text}</span>
      </button>
    </div>
  );
};
export default FloatingButton;
