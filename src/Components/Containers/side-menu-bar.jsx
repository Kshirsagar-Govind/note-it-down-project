import React, { Component } from "react";
import "../SCSS/main-scss.scss";
import { Link } from "react-router-dom";
import "../SCSS/_sidebar-scss.scss";
import HomeLogo from "../Assets/SVG-JSX/home-logo";
import TasksLogo from "../Assets/SVG-JSX/tasks-logo";
import ExpenseLogo from "../Assets/SVG-JSX/expense-logo";
import PasswordLogo from "../Assets/SVG-JSX/password-logo";
import { connect } from "react-redux";

import {
  changeMode,
  isUserValid,
} from "../Services/Actions/[ AUTH ] userValidity";
import AllNotesLogo from "../Assets/SVG-JSX/all-notes-logo";
import { useDispatch } from "react-redux";

class SideMenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_menu: "Home",
      menu_color: "#fff",
      user_mode: "light-mode",
      Menus: [
        "Home",
        "Profile",
        "All Notes",
        "Tasks",
        "Reminders",
        "Expenses",
        "Password",
      ],
    };
  }
  componentDidMount() {
    this.setState({ user_mode: this.props.isUserValid.app_mode }, () => {});
  }

  changeTheme = mode => {};

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.isUserValid.app_mode !== this.state.user_mode) {
  //     return true;
  //   } else return false;
  // }

  render() {
    return (
      <div className="side-menu-bar">
        <div className="brand-section just-center">
          <h1>Note It Down</h1>
        </div>
        <ul>
          <Link className="text-link" to="/home">
            <li
              className={
                this.state.curr_menu === "Home" ? (
                  `active-menu ${this.state.user_mode}`
                ) : (
                  ""
                )
              }
              onClick={() => this.setState({ curr_menu: "Home" })}
            >
              <div className="sidemenu-logo">
                <HomeLogo
                  color={this.state.curr_menu === "Home" ? "#5F65E7" : "#fff"}
                  size={this.state.curr_menu === "Home" ? "2" : "1.5"}
                />
              </div>
              Home
            </li>
          </Link>

          <Link className="text-link" to="/expenses">
            <li
              className={
                this.state.curr_menu === "Expenses" ? (
                  `active-menu ${this.state.user_mode}`
                ) : (
                  ""
                )
              }
              onClick={() => this.setState({ curr_menu: "Expenses" })}
            >
              <div className="sidemenu-logo">
                <ExpenseLogo
                  color={
                    this.state.curr_menu === "Expenses" ? "#5F65E7" : "#fff"
                  }
                />
              </div>
              Expenses
            </li>
          </Link>

          <Link className="text-link" to="/all-notes">
            <li
              className={
                this.state.curr_menu === "All Notes" ? (
                  `active-menu ${this.state.user_mode}`
                ) : (
                  ""
                )
              }
              onClick={() => this.setState({ curr_menu: "All Notes" })}
            >
              <div className="sidemenu-logo">
                <AllNotesLogo
                  color={
                    this.state.curr_menu === "All Notes" ? "#5F65E7" : "#fff"
                  }
                />
              </div>
              All Notes
            </li>
          </Link>
          <Link className="text-link" to="/tasks">
            <li
              className={
                this.state.curr_menu === "Tasks" ? (
                  `active-menu ${this.state.user_mode}`
                ) : (
                  ""
                )
              }
              onClick={() => this.setState({ curr_menu: "Tasks" })}
            >
              <div className="sidemenu-logo">
                <TasksLogo
                  color={this.state.curr_menu === "Tasks" ? "#5F65E7" : "#fff"}
                />
              </div>
              Tasks
            </li>
          </Link>

          {/* <Link className="text-link" to="/reminders">
            <li
              className={
                this.state.curr_menu == "Reminders" ? `active-menu ${this.state.user_mode}` : ""
              }
              onClick={() => this.setState({ curr_menu: "Reminders" })}
            >
              <div className="sidemenu-logo">
                <ReminderLogo
                  color={
                    this.state.curr_menu == "Reminders" ? "#5F65E7" : "#fff"
                  }
                />
              </div>
              Reminders
            </li>
          </Link> */}

          <Link className="text-link" to="/passwords">
            <li
              className={
                this.state.curr_menu === "Password" ? (
                  `active-menu ${this.state.user_mode}`
                ) : (
                  ""
                )
              }
              onClick={() => this.setState({ curr_menu: "Password" })}
            >
              <div className="sidemenu-logo">
                <PasswordLogo
                  color={
                    this.state.curr_menu === "Password" ? "#5F65E7" : "#fff"
                  }
                />
              </div>
              Password
            </li>
          </Link>
        </ul>
        <ThemeChangeButton
          user_mode={this.state.user_mode}
          changeTheme={mode => this.setState({ user_mode: mode })}
        />
        {/* <div className="theme-button-div">
          <div
            onClick={() => this.changeTheme()}
            className={`theme-button ${this.state.user_mode}`}
          >
            <div className="theme-button-nob" />
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserValid: state.authReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuBar);

// export default SideMenuBar;

const ThemeChangeButton = ({ user_mode, changeTheme }) => {
  const dispatch = useDispatch();
  const toggleTheme = () => {
    let mode = user_mode;
    if (mode == "dark-mode") {
      mode = "light-mode";
    } else mode = "dark-mode";
    changeTheme(mode);
    dispatch(changeMode(mode));
  };

  return (
    <div className="theme-button-div">
      <div
        onClick={() => {
          toggleTheme();
        }}
        className={`theme-button ${user_mode}`}
      >
        <div className="theme-button-nob" />
      </div>
    </div>
  );
};
