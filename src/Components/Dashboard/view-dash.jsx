import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import React, { useEffect, useState } from "react";
import NotificationLogo from "../Assets/SVG-JSX/notification-logo";
import routes from "../routes";
import UserLogo from "../Assets/SVG-JSX/user-logo";
import LogoutLogo from "../Assets/SVG-JSX/logout-logo";
const View = ({ user }) => {
  const [ showProfile, setShowProfile ] = useState(false);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div className="">
      <div className="view-dash-top just-space">
        <div className="" />
        <div className="user-profile-div">
          <span>
            <NotificationLogo />
          </span>
          <h3 className="pointer" onClick={() => setShowProfile(!showProfile)}>
            {" "}
            {user.name}{" "}
          </h3>
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

      {showProfile ? (
        <div className="profile-popup">
          <ul>
            <Link to="/profile" className="text-link">
              <li>
                <span>
                  <UserLogo color="#5F65E7" />
                </span>
                Profile
              </li>
            </Link>
            <li>
              <span>
                <LogoutLogo color="#5F65E7" />
              </span>{" "}
              Logout
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default View;
