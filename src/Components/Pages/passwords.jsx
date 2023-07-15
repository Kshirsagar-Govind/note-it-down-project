import React, { Component, useState } from "react";
import FloatingButton from "../Containers/floating-button";
import Colors from "../Helpers/colors";
import CloseButton from "../Helpers/close-button";
import ArrowDown from "../Assets/SVG/arrow-down.svg";
import { GetCurrentDate } from "../Helpers/getDate";
import Logo from "../Assets/SVG-JSX/home-logo";
import Header from "../Containers/header";
import PasswordLogo from "../Assets/SVG-JSX/password-logo";
import EditLogo from "../Assets/SVG-JSX/edit-logo";
import ViewLogo from "../Assets/SVG-JSX/view-logo";
import { connect } from "react-redux";
import axios from "axios";
import {
  addPassword,
  editPassword,
  getAllPassword,
} from "../Services/Actions/[ PASSWORD ]";
import { useDispatch } from "react-redux";
import { getAllPasswordData } from "../Services/API_CALLS/password_services";

class PasswordsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddPassword: false,
      label: "",
      search: "",
      password_category: "",
      password: "",
      c_password: "",
      added_on: "",
      loading: false,
      passwordsData: [],
      high_passwordsData: "",
      medium_passwordsData: "",
      low_passwordsData: "",
    };
  }

  addNewPassword = async () => {
    if (this.state.c_password !== this.state.password) {
      return alert("Password Not Matching");
    }
    try {
      this.setState({
        loading: true,
      });

      const data = {
        user_id: this.props.isUserValid.user_id,
        label: this.state.label,
        password_category: this.state.password_category,
        password: this.state.password,
        added_on: GetCurrentDate(),
      };

      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/add-password`,
        data
      );
      alert("Password Saved");
      this.props.addPassword(data);
      this.setState({
        loading: false,
      });
      this.getPasswordsData();
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getPasswordsData();
  }
  
  getPasswordsData=async()=>{
    const data = await getAllPasswordData()
    this.setState({
      passwordsData: data,
    });
  }


  render() {
    return (
      <div className="passwords-page">
        <Header title="Passwords" />

        <div className="search-header">
          <input
            className="head-14-semi input-box"
            onChange={e => this.setState({ search: e.target.value })}
            type="text"
            placeholder="Search Password"
            value={this.state.search}
          />
        </div>

        <div className="just-center">
          <div className="tasks-section">
            {this.state.passwordsData.map(
              item =>
                this.state.search != "" ? item.label
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase()) ? (
                  <PasswordCard data={item} Severity={item.password_category} />
                ) : null : (
                  <PasswordCard data={item} Severity={item.password_category} />
                )
            )}
          </div>
        </div>

        <div className="floating-button">
          <FloatingButton
            text="+"
            callback={() => {
              this.setState({ showAddPassword: true });
            }}
          />
        </div>
        {this.state.showAddPassword ? (
          <div className="dark-back just-center">
            <div className="add-note-popup">
              <div className="just-space">
                <h1>Add New Password +</h1>
                <CloseButton
                  callback={() => {
                    this.setState({ showAddPassword: false });
                  }}
                />
              </div>
              <br />
              <div className="note-popup-form ">
                <div className=" m-yy-20">
                  <label className="head-16-semi col-200" htmlFor="">
                    Password For
                  </label>
                  <span className="input-wrapper">
                    <input
                      value={this.state.label}
                      onChange={e => this.setState({ label: e.target.value })}
                      className="input-box head-16-semi"
                      type="text"
                    />
                  </span>
                </div>

                <div className=" m-yy-20">
                  <label className="head-16-semi col-200" htmlFor="">
                    Enter Password
                  </label>
                  <span className="input-wrapper">
                    <input
                      value={this.state.password}
                      onChange={e =>
                        this.setState({ password: e.target.value })}
                      className="input-box head-16-semi"
                      type="password"
                    />
                  </span>
                </div>

                <div className=" m-yy-20">
                  <label className="head-16-semi col-200" htmlFor="">
                    Confirm Password
                  </label>
                  <span className="input-wrapper">
                    <input
                      value={this.state.c_password}
                      onChange={e =>
                        this.setState({ c_password: e.target.value })}
                      className="input-box head-16-semi"
                      type="password"
                    />
                  </span>
                </div>
                <div className="d-flex-center m-yy-20">
                  <label className="head-16-semi col-200" htmlFor="">
                    Severity
                  </label>

                  <select
                    value={this.state.password_category}
                    onChange={e =>
                      this.setState({ password_category: e.target.value })}
                    className="select-box head-16-semi"
                  >
                    <option value="" hidden>
                      Select{" "}
                    </option>
                    <option value="High">High </option>
                    <option value="Medium">Medium </option>
                    <option value="Low">Low </option>
                  </select>
                </div>
              </div>

              <div className=" m-yy-20">
                <label className="head-16-semi col-200" htmlFor="" />
                <span className="button-wrapper">
                  <button
                    onClick={() => this.addNewPassword()}
                    className="primary_button head-16-semi"
                  >
                    Add Password
                  </button>
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const PasswordCard = ({ data, Severity }) => {
  const [ showPasswords, setShowPasswords ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showEditPassword, setshowEditPassword ] = useState(false);
  const [ password, setPassword ] = useState("");
  const [ c_password, setC_password ] = useState("");
  const dispatch = useDispatch();

  const color =
    Severity == "High"
      ? "#FFC0C0"
      : Severity == "Medium"
        ? "#FFE195"
        : Severity == "Low" ? "#AFFFE7" : "#F1F1F1";

  const onEditPassword = async () => {
    if (password !== c_password) return alert("Passwords not matching");
    try {
      setshowEditPassword(false);
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/edit-password`,
        {
          password: password,
          label: data.label,
        }
      );

      const newdata = {
        label: data.label,
        password_category: data.password_category,
        password: password,
        added_on: data.added_on,
      };

      dispatch(editPassword(newdata));
      setshowEditPassword(false);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tasks-container" style={{ backgroundColor: `${color}` }}>
      <div
        className="task-container-title just-space"
        onClick={() => setShowPasswords(!showPasswords)}
      >
        <h1 className="head-24-semi">{data.label}</h1>
        <img
          className={showPasswords ? "rot-180" : ""}
          src={ArrowDown}
          alt=""
        />
      </div>

      <div className={showPasswords ? "tasks-list-div" : "none"}>
        <div className="just-space task-container">
          <span>
            <h1 className="head-16-semi">{data.password}</h1>
            {showPassword ? (
              <h1 className="head-12-regular its-password">{data.password}</h1>
            ) : null}
          </span>

          <span className="utility-section">
            <div
              className="logo"
              onClick={() => {
                setshowEditPassword(true);
              }}
            >
              <EditLogo color={"#000"} />
            </div>
            {/* <div
              className="logo"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              <ViewLogo color={"#000"} />
            </div> */}
          </span>
        </div>
      </div>

      {showEditPassword ? (
        <div className="dark-back just-center">
          <div className="edit-popup">
            <div className="popup-container-title just-space">
              <h1 className="head-24-semi">Change Password</h1>
              <CloseButton
                callback={() => {
                  setshowEditPassword(false);
                }}
              />
            </div>

            <div className="popup-form ">
              <div className=" m-yy-20">
                <label className="head-16-semi col-200" htmlFor="">
                  Enter New Password
                </label>
                <span className="input-wrapper">
                  <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-box head-16-semi"
                    type="password"
                  />
                </span>
              </div>

              <div className=" m-yy-20">
                <label className="head-16-semi col-200" htmlFor="">
                  Confirm Password
                </label>
                <span className="input-wrapper">
                  <input
                    value={c_password}
                    onChange={e => setC_password(e.target.value)}
                    className="input-box head-16-semi"
                    type="password"
                  />
                </span>
              </div>

              <div className=" m-yy-20">
                <label className="head-16-semi col-200" htmlFor="" />
                <span className="input-wrapper">
                  <button
                    onClick={() => onEditPassword()}
                    className="primary_button head-16-semi"
                  >
                    Submit
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isUserValid: state.authReducer,
    passwords: state.passwordReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPassword: pass => {
      dispatch(addPassword(pass));
    },
    editPassword: pass => {
      dispatch(editPassword(pass));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordsPage);
