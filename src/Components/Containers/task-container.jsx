import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PasswordLogo from "../Assets/SVG-JSX/password-logo";
import Colors from "../Helpers/colors";
import { updatetTaskStatus } from "../Services/Actions/[ TASKS ]";

const TaskContainer = ({ id, color, task }) => {
  const dispatch = useDispatch();
  const [ checked, setChecked ] = useState(task.status);

  const updateStatus = async status => {
    // alert(status);
    setChecked(!status);
    const data = {
      id: id,
      task_id: task.task_id,
      status: !status,
    };

    const res = await axios.post(
      `${process.env.REACT_APP_HOST}/update-task-status`,
      data
    );
    dispatch(updatetTaskStatus(data));
  };

  return (
    <div className="task-container">
      <div className="">
        <h1 className={checked ? "head-18-semi task_desc" : "head-18-semi"}>
          {task.task}
        </h1>
      </div>
      <div className="task-options">
        {/* {checked ? <PasswordLogo color="#000" /> : null} */}
        <button
          style={
            checked ? (
              { backgroundColor: `${color}` }
            ) : (
              { backgroundColor: "#fff", border: `3px solid ${color}` }
            )
          }
          className={
            checked ? (
              "task-complete-button btn_shadow"
            ) : (
              "task-complete-button "
            )
          }
          onClick={() => updateStatus(checked)}
        />
      </div>
    </div>
  );
};
export default TaskContainer;

/*
   <input
            onChange={e => updateStatus(e.target.checked)}
            checked={false}
            type="checkbox"
          />
*/
