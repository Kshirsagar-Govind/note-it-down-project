import React from "react";
import Colors from "../Helpers/colors";

const TaskContainer = ({ task }) => {
  return (
    <div className="task-container">
      <div className="">
        <h1 className="head-18-semi">{task.task}</h1>
      </div>
      <div className="task-options">
        <input type="checkbox" />
      </div>
    </div>
  );
};
export default TaskContainer;
