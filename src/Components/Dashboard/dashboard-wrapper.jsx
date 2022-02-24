import React, { Component } from "react";
import Sidemenu from "../Containers/side-menu-bar";
import View from "./view-dash";

class DashboardWrapper extends Component {
  render() {
    return (
      <div className="dashboard-wrapper">
        <div className="">
          <Sidemenu />
        </div>

        <div style={{ backgroundColor: "#FAFAFA", flex: 1 }}>
          <View />
        </div>
      </div>
    );
  }
}

export default DashboardWrapper;
