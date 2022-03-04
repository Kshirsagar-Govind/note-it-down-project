import React, { Component } from "react";
import Sidemenu from "../Containers/side-menu-bar";
import View from "./view-dash";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Registration from "../Pages/registration";
import { connect } from "react-redux";

class DashboardWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { user_data: {} };
  }

  componentDidMount() {
    this.setState({ user_data: this.props.isUserValid }, () => {});
  }

  render() {
    return (
      <div>
        <div className="dashboard-wrapper">
          <div className="">
            <Sidemenu />
          </div>

          <div className="dark-mode" style={{ flex: 1 }}>
            <View user={this.state.user_data} />
          </div>
        </div>

        {/* {this.state.user_data.loggedIn ? (
          <div className="dashboard-wrapper">
            <div className="">
              <Sidemenu />
            </div>

            <div style={{ backgroundColor: "#FAFAFA", flex: 1 }}>
              <View />
            </div>
          </div>
        ) : (
          <div className="just-center">
            <span>
              <h1>404</h1>
              <h1>Invalid user</h1>
            </span>
          </div>
        )} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserValid: state.authReducer,
    notes: state.noteReducer,
  };
};

export default connect(mapStateToProps, null)(DashboardWrapper);
