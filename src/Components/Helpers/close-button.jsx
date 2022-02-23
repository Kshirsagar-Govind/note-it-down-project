import React, { Component } from "react";

const CloseButton = ({ callback }) => {
  return (
    <div onClick={callback} className="back-box just-center">
      <h1 className="color-pure">X</h1>
    </div>
  );
};
export default CloseButton;
