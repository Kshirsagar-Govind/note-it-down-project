import React, { Component } from "react";
import Header from "../Containers/header";
import Logo from "../Assets/SVG-JSX/home-logo";
import NoteCard from "../Containers/note-card";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header title="Home Page" />
        <div className="" style={{ padding: "30px" }}>
          <NoteCard />
        </div>
      </div>
    );
  }
}

export default HomePage;
