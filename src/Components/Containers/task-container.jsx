import axios from "axios";
import React from "react";
import Colors from "../Helpers/colors";

const TaskContainer = ({ task }) => {
  const updateStatus = async status => {
    const data = {
      status: status,
      task_id: task.task_id,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_HOST}/update-task-status`,
      data
    );
  };

  return (
    <div className="task-container">
      <div className="">
        <h1 className="head-18-semi">{task.task}</h1>
      </div>
      <div className="task-options">
        <input
          onChange={e => () => updateStatus(e.target.checked)}
          checked={task.status}
          type="checkbox"
        />
      </div>
    </div>
  );
};
export default TaskContainer;
