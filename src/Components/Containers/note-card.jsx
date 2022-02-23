import React, { Component } from "react";
import { useEffect } from "react/cjs/react.production.min";
import Colors from "../Helpers/colors";

const NoteCard = ({ NoteData }) => {
  const Style = {
    backgroundColor: `${Colors[1].color}`,
  };
  return (
    <div className="note-card-wrapper" style={Style}>
      <div className="note-card-header">
        <h1>Note Name</h1>
      </div>
      <div className="note-card-note">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, totam!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, totam!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, totam!
        </p>
      </div>
    </div>
  );
};
export default NoteCard;
