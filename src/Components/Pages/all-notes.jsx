import React, { Component } from "react";

import Logo from "../Assets/SVG-JSX/home-logo";
import FloatingButton from "../Containers/floating-button";
import Header from "../Containers/header";
import NoteCard from "../Containers/note-card";
import CloseButton from "../Helpers/close-button";
import Colors from "../Helpers/colors";

class AllNotesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowAddNote: true,
      selectedColor: "",
    };
  }

  render() {
    return (
      <div className="all-notes-page">
        <Header title="All Notes" />
        <div className="notes-section">
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>

        <FloatingButton
          text="Add New Note +"
          callback={() => {
            this.setState({ ShowAddNote: true });
          }}
          style={this.style}
        />
        {this.state.ShowAddNote ? (
          <div className="dark-back just-center">
            <div className="add-note-popup">
              <div className="note-popup-header just-space">
                <h1>Add New Note +</h1>
                <CloseButton
                  callback={() => {
                    this.setState({ ShowAddNote: false });
                  }}
                />
              </div>
              <br />
              <div className="note-popup-form ">
                <div className=" m-yy-20">
                  <label className="head-16-semi col-100" htmlFor="">
                    Note Name
                  </label>
                  <span className="input-wrapper">
                    <input className="input-box head-16-semi" type="text" />
                  </span>
                </div>

                <div className="d-flex-center m-yy-20">
                  <label className="head-16-semi col-100" htmlFor="">
                    Write Note
                  </label>
                  <span className="input-wrapper">
                    <textarea
                      cols={50}
                      rows={15}
                      className="input-textarea head-16-semi"
                      type="text"
                    />
                  </span>
                </div>
                <div className="d-flex-center m-yy-20">
                  <label className="head-16-semi col-100" htmlFor="">
                    Color
                  </label>

                  <span className="d-flex">
                    {Colors.map(item => (
                      <div
                        onClick={() =>
                          this.setState({ selectedColor: item.color })}
                        style={{ backgroundColor: `${item.color}` }}
                        className={
                          item.color == this.state.selectedColor ? (
                            "color-pick-selected"
                          ) : (
                            "color-pick"
                          )
                        }
                      />
                    ))}
                  </span>
                </div>
              </div>
              <span className="button-wrapper">
                <button className="primary_button head-16-semi">
                  Add Note
                </button>
              </span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AllNotesPage;
