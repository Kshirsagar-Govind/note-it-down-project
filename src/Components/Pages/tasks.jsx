import React, { Component, useState } from "react";
import Colors from "../Helpers/colors";

import Logo from "../Assets/SVG-JSX/home-logo";
import ArrowDown from "../Assets/SVG/arrow-down.svg";
import FloatingButton from "../Containers/floating-button";
import Header from "../Containers/header";
import TaskContainer from "../Containers/task-container";

class TasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: "",
    };
  }

  render() {
    return (
      <div className="tasks-page">
        <Header title="Tasks" />

        <div className="just-center">
          <div className="tasks-section">
            {Colors.map(item => <TasksCard color={item.color} />)}
          </div>
        </div>

        <div className="floating-button">
          <FloatingButton text="Add New Tasks +" callback={() => {}} />
        </div>
      </div>
    );
  }
}

export default TasksPage;

const TasksCard = ({ data, color }) => {
  const [ showTasks, setShowTasks ] = useState(false);
  return (
    <div className="tasks-container" style={{ backgroundColor: `${color}` }}>
      <div
        className="task-container-title just-space"
        onClick={() => setShowTasks(!showTasks)}
      >
        <h1 className="head-24-semi">My Task</h1>
        <img className={showTasks ? "rot-180" : ""} src={ArrowDown} alt="" />
      </div>
      <div className={showTasks ? "tasks-list-div" : "none"}>
        <TaskContainer />
        <TaskContainer />
        <TaskContainer />
        <TaskContainer />
        <TaskContainer />
      </div>
    </div>
  );
};
