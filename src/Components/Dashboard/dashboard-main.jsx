import React, { Component } from "react";
import DashboardWrapper from "./dashboard-wrapper";
import { Route, Routes } from "react-router-dom";
import Registration from "../Pages/registration";
import { connect } from "react-redux";

class DashboardMain extends Component {
  constructor(props) {
    super(props);
    this.state = { ifLogin: false };
  }
  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    return (
      <div>
        <Routes>
          <Route path="/*" exact element={<DashboardWrapper />} />
          <Route path="/" exact element={<Registration />} />
        </Routes>
      </div>
    );
  }
}

export default DashboardMain;
