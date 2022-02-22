import React, { Component } from "react";
import "../SCSS/_comps-scss.scss";

import HomeLogo from "../Assets/SVG-JSX/home-logo";
import TasksLogo from "../Assets/SVG-JSX/tasks-logo";
import ExpenseLogo from "../Assets/SVG-JSX/expense-logo";
import ReminderLogo from "../Assets/SVG-JSX/reminder-logo";
import PasswordLogo from "../Assets/SVG-JSX/password-logo";

import AllNotesLogo from "../Assets/SVG-JSX/all-notes-logo";

const Header = ({ title }) => {
  return (
    <div className="header">
      <div className="logo">
        {title == "Home Page" ? (
          <HomeLogo color="#fff" />
        ) : title == "All Notes" ? (
          <AllNotesLogo color="#fff" />
        ) : title == "Tasks" ? (
          <TasksLogo color="#fff" />
        ) : title == "Reminders" ? (
          <ReminderLogo color="#fff" />
        ) : title == "Expenses" ? (
          <ExpenseLogo color="#fff" />
        ) : (
          <PasswordLogo color="#fff" />
        )}
      </div>

      <h1>{title}</h1>
    </div>
  );
};

export default Header;
