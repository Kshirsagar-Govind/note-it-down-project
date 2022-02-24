import React, { Component, useState } from "react";
import Colors from "../Helpers/colors";
import CloseButton from "../Helpers/close-button";

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
      addMore: [],
      showAddTasks: false,
    };
  }

  AddMoreInput = () => {
    // alert("ok");
    let arr = [ ...this.state.addMore ];
    arr.push(1);

    this.setState({
      addMore: arr,
    });
  };

  render() {
    return (
      <div className="tasks-page">
        <Header title="Tasks" />

        <div className="just-center">
          <div className="tasks-section">
            {Colors.map(item => <TasksCard color={item.color} />)}
          </div>
        </div>
        {this.state.showAddTasks ? (
          <div className="dark-back just-center">
            <div className="add-note-popup">
              <div className="note-popup-header just-space">
                <h1>Add New Task +</h1>
                <CloseButton
                  callback={() => {
                    this.setState({ showAddTasks: false });
                  }}
                />
              </div>

              <div className="note-popup-form ">
                <div className=" m-yy-20">
                  <label className="head-16-semi col-100" htmlFor="">
                    Tasks Title
                  </label>
                  <span className="input-wrapper">
                    <input className="input-box head-16-semi" type="text" />
                  </span>
                </div>

                <div className=" m-yy-20">
                  <label className="head-16-semi col-100" htmlFor="">
                    Task
                  </label>
                  <span className="input-wrapper">
                    <input className="input-box head-16-semi" type="text" />
                  </span>
                  <span className="button-wrapper">
                    <button
                      onClick={() => this.AddMoreInput()}
                      className="secondary_button head-16-semi m-xx-20"
                    >
                      {" "}
                      +{" "}
                    </button>
                  </span>
                </div>
                {this.state.addMore.map(item => (
                  <div className=" m-yy-20">
                    <label className="head-16-semi col-100" htmlFor="">
                      Task
                    </label>
                    <span className="input-wrapper">
                      <input className="input-box head-16-semi" type="text" />
                    </span>
                  </div>
                ))}
                <div className="just-space">
                  <div />
                  <span className="button-wrapper">
                    <button className="primary_button head-16-semi">
                      Add Tasks
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="floating-button">
          <FloatingButton
            text="Add New Tasks +"
            callback={() => {
              this.setState({ showAddTasks: true });
            }}
          />
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
