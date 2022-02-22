import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import React from "react";
import NotificationLogo from "../Assets/SVG-JSX/notification-logo";
import routes from "../routes";
const View = () => {
  return (
    <div className="">
      <div className="view-dash-top just-space">
        <div className="" />
        <div className="user-profile-div">
          <span>
            <NotificationLogo />
          </span>
          <h3> User Name</h3>
        </div>
      </div>

      <Routes>
        {routes.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            exact={item.exact}
            element={<item.main />}
          />
        ))}
      </Routes>
    </div>
  );
};

export default View;
