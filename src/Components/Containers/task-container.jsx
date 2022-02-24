import React, { Component } from "react";
import { useEffect } from "react/cjs/react.production.min";
import Colors from "../Helpers/colors";

const TaskContainer = ({ TaskData }) => {
  const Style = {
    backgroundColor: `${Colors[1].color}`,
  };
  return (
    <div className="task-container">
      <div className="">
        <h1 className="head-18-semi">Task Name</h1>
      </div>
      <div className="task-options">
        <input type="checkbox" />
        <input type="checkbox" />
      </div>
    </div>
  );
};
export default TaskContainer;
