import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Containers/header";
import CloseButton from "../Helpers/close-button";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      showPopup: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.user !== props.isUserValid) {
      console.log(props);
      return {
        user: props.isUserValid,
      };
    }
  }

  render() {
    return (
      <div className="all-notes-page">
        <Header title="Profile" />
        <div className="table-class">
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <th>{this.state.user.name}</th>
              </tr>

              <tr>
                <td>Email</td>
                <th>{this.state.user.email}</th>
              </tr>

              <tr>
                <td>User ID</td>
                <th>{this.state.user.user_id}</th>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: "10px" }} className="">
            <button
              onClick={() => this.setState({ showPopup: true })}
              className="secondary_button"
            >
              Edit Details
            </button>
          </div>
        </div>

        {this.state.showPopup ? (
          <div className="dark-back just-center">
            <div className="add-note-popup">
              <div className="just-space">
                <h1>Edit Your Details</h1>
                <CloseButton
                  onClick={() => this.setState({ showPopup: false })}
                />
              </div>
              <div className="">
                <label htmlFor="">Name</label>
                <input type="text" />
              </div>

              <div className="">
                <label htmlFor="">Email</label>
                <input type="text" />
              </div>
            </div>
          </div>
        ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
