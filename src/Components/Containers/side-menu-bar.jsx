import React, { Component } from "react";
import "../SCSS/main-scss.scss";
import { Link } from "react-router-dom";
import "../SCSS/_sidebar-scss.scss";
import HomeLogo from "../Assets/SVG-JSX/home-logo";
import TasksLogo from "../Assets/SVG-JSX/tasks-logo";
import ExpenseLogo from "../Assets/SVG-JSX/expense-logo";
import ReminderLogo from "../Assets/SVG-JSX/reminder-logo";
import PasswordLogo from "../Assets/SVG-JSX/password-logo";

import AllNotesLogo from "../Assets/SVG-JSX/all-notes-logo";

class SideMenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_menu: "Home",
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

  render() {
    return (
      <div className="side-menu-bar">
        <div className="brand-section just-center">
          <h1>Note It Down</h1>
        </div>
        <ul>
          <li
            className={this.state.curr_menu == "Home" ? "active-menu" : ""}
            onClick={() => this.setState({ curr_menu: "Home" })}
          >
            <logo>
              <HomeLogo
                color={this.state.curr_menu == "Home" ? "#5F65E7" : "#fff"}
                size={this.state.curr_menu == "Home" ? "2" : "1.5"}
              />
            </logo>
            <Link className="text-link" to="/">
              Home
            </Link>
          </li>

          <li
            className={this.state.curr_menu == "All Notes" ? "active-menu" : ""}
            onClick={() => this.setState({ curr_menu: "All Notes" })}
          >
            <logo>
              <AllNotesLogo
                color={this.state.curr_menu == "All Notes" ? "#5F65E7" : "#fff"}
              />
            </logo>
            <Link className="text-link" to="/all-notes">
              All Notes
            </Link>
          </li>

          <li
            className={this.state.curr_menu == "Tasks" ? "active-menu" : ""}
            onClick={() => this.setState({ curr_menu: "Tasks" })}
          >
            <logo>
              <TasksLogo
                color={this.state.curr_menu == "Tasks" ? "#5F65E7" : "#fff"}
              />
            </logo>
            <Link className="text-link" to="/tasks">
              Tasks
            </Link>
          </li>

          <li
            className={this.state.curr_menu == "Reminders" ? "active-menu" : ""}
            onClick={() => this.setState({ curr_menu: "Reminders" })}
          >
            <logo>
              <ReminderLogo
                color={this.state.curr_menu == "Reminders" ? "#5F65E7" : "#fff"}
              />
            </logo>
            <Link className="text-link" to="/reminders">
              Reminders
            </Link>
          </li>

          <li
            className={this.state.curr_menu == "Expenses" ? "active-menu" : ""}
            onClick={() => this.setState({ curr_menu: "Expenses" })}
          >
            <logo>
              <ExpenseLogo
                color={this.state.curr_menu == "Expenses" ? "#5F65E7" : "#fff"}
              />
            </logo>
            <Link className="text-link" to="/expenses">
              Expenses
            </Link>
          </li>

          <li
            className={this.state.curr_menu == "Password" ? "active-menu" : ""}
            onClick={() => this.setState({ curr_menu: "Password" })}
          >
            <logo>
              <PasswordLogo
                color={this.state.curr_menu == "Password" ? "#5F65E7" : "#fff"}
              />
            </logo>
            <Link className="text-link" to="/passwords">
              Password
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideMenuBar;
