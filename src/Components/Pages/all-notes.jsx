import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Logo from "../Assets/SVG-JSX/home-logo";
import FloatingButton from "../Containers/floating-button";
import Header from "../Containers/header";
import NoteCard from "../Containers/note-card";
import CloseButton from "../Helpers/close-button";
import Colors from "../Helpers/colors";
import { getAllNotes, addNote } from "../Services/Actions/[ NOTES ]";
import { SuccessNotify } from "../Helpers/popups";
import LoaderScreen from "../Helpers/loader-screen";
import { GetNoteId } from "../Helpers/id-generator";
import randomstring from "randomstring";
import { GetCurrentDate } from "../Helpers/getDate";

class AllNotesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotes: [],
      ShowAddNote: false,
      selectedColor: "#F1F1F1",
      loading: false,
      title: "",
      note: "",
      color: "",
      user_id: "owcs6k3rX8",
      search: "",
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  addNote = async () => {
    try {
      this.setState({ ShowAddNote: false, loading: true });
      const note = {
        user_id: this.props.isUserValid.user_id,
        title: this.state.title,
        note: this.state.note,
        note_id: (Math.random() + 1).toString(36).substring(7),
        color: this.state.selectedColor,
        added_on: GetCurrentDate(),
      };

      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/add-note`,
        note
      );
      console.log(note);

      if (res.status == 200) {
        this.props.addNote(note);
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
      alert("Failed");
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      this.setState({ allNotes: this.props.notes });
      return false;
    } else return true;
  }

  render() {
    return (
      <div className="all-notes-page">
        <Header title="All Notes" />

        <div className="search-header">
          <input
            className="head-14-semi input-box"
            onChange={e => this.setState({ search: e.target.value })}
            type="text"
            placeholder="Search Note"
            value={this.state.search}
          />
        </div>

        <div className="notes-section">
          {this.props.notes.map(
            item =>
              this.state.search != "" ? item.title
                .toLowerCase()
                .includes(this.state.search.toLowerCase()) ? (
                <NoteCard NoteData={item} color={item.color} />
              ) : null : (
                <NoteCard NoteData={item} color={item.color} />
              )
          )}
        </div>

        <FloatingButton
          text="+"
          callback={() => {
            this.setState({ ShowAddNote: true });
          }}
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
                    <input
                      onChange={e => this.setState({ title: e.target.value })}
                      className="input-box head-16-semi"
                      type="text"
                    />
                  </span>
                </div>

                <div className="d-flex-center m-yy-20">
                  <label className="head-16-semi col-100" htmlFor="">
                    Write Note
                  </label>
                  <span className="input-wrapper">
                    <textarea
                      onChange={e => this.setState({ note: e.target.value })}
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
              <div className="d-flex-center m-yy-20">
                <label className="head-16-semi col-100" htmlFor="" />
                <span className="button-wrapper">
                  <button
                    onClick={() => this.addNote()}
                    className="primary_button head-16-semi"
                  >
                    Add Note
                  </button>
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.loading ? <LoaderScreen /> : null}
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

const mapDispatchToProps = dispatch => {
  return {
    addNote: note => {
      dispatch(addNote(note));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllNotesPage);
