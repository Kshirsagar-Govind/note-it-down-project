import React, { Component, useState } from "react";
import Colors from "../Helpers/colors";
import CloseButton from "../Helpers/close-button";
import { GetCurrentDate } from "../Helpers/getDate";

import ArrowDown from "../Assets/SVG/arrow-down.svg";
import FloatingButton from "../Containers/floating-button";
import Header from "../Containers/header";
import TaskContainer from "../Containers/task-container";
import axios from "axios";
import { connect } from "react-redux";
import { addTask } from "../Services/Actions/[ TASKS ]";
import { getAllTasks } from "../Services/API_CALLS/tasks_services";

class TasksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: "#F1F1F1",
      addMore: [],
      tasks: [],
      tasks_title: "",
      search: "",
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

  RemoveMoreInput = () => {
    // alert("ok");
    let arr = [ ...this.state.addMore ];
    arr.pop(1);
    this.setState({
      addMore: arr,
    });
  };
  addTask = async () => {
    try {
      const divs = document.getElementsByClassName("tasks");
      const Tasks = [];
      for (let i = 0; i < divs.length; i++) {
        if (divs[i].value == "") {
          return alert("Empty Task not allowed");
        }
        const obj = {
          task_id: (Math.random() + 1).toString(36).substring(7),
          label: divs[i].name,
          task: divs[i].value,
          status: false,
        };
        Tasks.push(obj);
      }
      const data = {
        user_id: this.props.isUserValid.user_id,
        tasks_id: (Math.random() + 1).toString(36).substring(7),
        tasks_title: this.state.tasks_title,
        added_on: GetCurrentDate(),
        color: this.state.selectedColor,
        Tasks: Tasks,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/add-tasks`,
        data
      );

      this.props.addTask(data);
      this.setState({ showAddTasks: false });
      this.getTasksData();
    } catch (error) {
      console.log(error);
    }
  };

  getTasksData =async()=>{
    const data = await getAllTasks();
    this.setState({ tasks: data });
  }

  componentDidMount() {
    this.getTasksData();
  }


  filter_data = value => {
    const filtered = this.props.allTasks.filter(
      item => item.tasks_title == value
    );
    this.setState({ tasks: filtered, search: value }, () => {
    });
  };


  render() {
    return (
      <div className="tasks-page">
        <Header title="Tasks" />

        <div className="search-header">
          <input
            className="head-14-semi input-box"
            onChange={e => this.setState({ search: e.target.value })}
            type="text"
            placeholder="Search Task"
            value={this.state.search}
          />
        </div>

        <div className="just-center">
          <div className="tasks-section">
            {this.state.tasks.map(
              item =>
                this.state.search !=
                "" ? item.tasks_title
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase()) ? (
                  <TasksCard data={item} color={item.color} />
                ) : null : (
                  <TasksCard data={item} color={item.color} />
                )
            )}
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
                    <input
                      value={this.state.tasks_title}
                      onChange={e =>
                        this.setState({ tasks_title: e.target.value })}
                      className="input-box head-16-semi"
                      type="text"
                    />
                  </span>
                </div>

                <div className="d-flex-center m-yy-20">
                  <label className="head-16-semi col-100" htmlFor="">
                    Color
                  </label>

                  <span className="d-flex">
                    {Colors.map(item => (
                      <div
                        onClick={() =>
                          this.setState({ selectedColor: item.color })}
                        style={{ backgroundColor: `${item.color}` }}
                        className={
                          item.color === this.state.selectedColor ? (
                            "color-pick-selected"
                          ) : (
                            "color-pick"
                          )
                        }
                      />
                    ))}
                  </span>
                </div>

                <div className=" m-yy-20">
                  <label className="head-16-semi col-100" htmlFor="">
                    Task 1
                  </label>
                  <span className="input-wrapper">
                    <input
                      className="tasks input-box head-16-semi"
                      type="text"
                      name="task 1"
                    />
                  </span>
                  <span className="button-wrapper">
                    <button
                      onClick={() => this.AddMoreInput()}
                      className="secondary_button head-16-semi m-xx-20"
                    >
                      {" "}
                      +{" "}
                    </button>

                    {this.state.addMore.length >= 1 ? (
                      <button
                        onClick={() => this.RemoveMoreInput()}
                        className="secondary_button head-16-semi"
                      >
                        {" "}
                        -{" "}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="secondary_button head-16-semi"
                      >
                        {" "}
                        -{" "}
                      </button>
                    )}
                  </span>
                </div>
                <div className="dynamic-input-div ">
                  {this.state.addMore.map((item, index) => (
                    <div className=" m-yy-20">
                      <label className="head-16-semi col-100" htmlFor="">
                        Task {index + 2}
                      </label>
                      <span className="input-wrapper">
                        <input
                          name={`task ${index + 2}`}
                          className="tasks input-box head-16-semi"
                          type="text"
                        />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="just-space">
                  <div />
                  <span className="button-wrapper">
                    <button
                      onClick={() => this.addTask()}
                      className="primary_button head-16-semi"
                    >
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
            text="+"
            callback={() => {
              this.setState({ showAddTasks: true });
            }}
          />
        </div>
      </div>
    );
  }
}

const TasksCard = ({ data, color }) => {
  const [ showTasks, setShowTasks ] = useState(false);
  console.log(data);
  return (
    <div className="tasks-container" style={{ backgroundColor: `${color}` }}>
      <div
        className="task-container-title just-space"
        onClick={() => setShowTasks(!showTasks)}
      >
        <h1 className="head-24-semi">{data.tasks_title}</h1>
        <img className={showTasks ? "rot-180" : ""} src={ArrowDown} alt="" />
      </div>
      <div className={showTasks ? "tasks-list-div" : "none"}>
        {data.Tasks.map(item => (
          <TaskContainer id={data.tasks_id} color={data.color} task={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isUserValid: state.authReducer,
    allTasks: state.tasksReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: data => {
      dispatch(addTask(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
