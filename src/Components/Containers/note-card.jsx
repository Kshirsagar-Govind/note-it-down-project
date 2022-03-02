import React, { useState } from "react";
import DeleteLogo from "../Assets/SVG/delete.svg";
import EditLogo from "../Assets/SVG/edit-note.svg";
import { deleteNote } from "../Services/Actions/[ NOTES ]";
import { useDispatch } from "react-redux";
import axios from "axios";
import LoaderScreen from "../Helpers/loader-screen";
import LoaderLogo from "../Helpers/loader-logo";

const NoteCard = ({ NoteData, color }) => {
  const [ loading, setLoading ] = useState(false);

  const Style = {
    backgroundColor: `${color}`,
  };

  const dispatch = useDispatch();

  const onDelete = async () => {
    try {
      setLoading(true);
      console.log(NoteData);

      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/delete-note/${NoteData.note_id}`
      );

      if (res.data.status === 200) {
        dispatch(deleteNote(NoteData.note_id));
      }
      setLoading(false);
      console.log(res);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="note-card-wrapper" style={Style}>
      <div className="note-card-header">
        <h1>{NoteData.title}</h1>
      </div>
      <div className="note-card-note">
        <p>{NoteData.note}</p>
      </div>

      <div className="options-section">
        <span>
          <img src={EditLogo} alt="" />
        </span>
        <span onClick={() => onDelete()}>
          <img src={DeleteLogo} alt="" />
        </span>
      </div>
      {loading ? (
        <div className="just-center">
          <LoaderLogo />
        </div>
      ) : null}
    </div>
  );
};
export default NoteCard;
