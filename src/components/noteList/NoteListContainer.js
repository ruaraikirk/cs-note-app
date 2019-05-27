import React from "react";
import { connect } from "react-redux";
import NoteListItem from "./NoteListItem";

class NoteListContainer extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {
      this.listAllNotes();
    }
  }

  listAllNotes = () => {
    return this.props.notes
      .sort((a, b) => parseInt(a.id) - parseInt(b.id))
      .map(note => {
        return (
          <NoteListItem
            id={note.id}
            note={note}
            selectNote={this.props.selectNote}
          />
        );
      });
  };

  render() {
    if (this.props.notes.length > 0) {
      return (
        <nav
          style={{
            borderRight: "1px solid #ddd",
            borderBottom: "1px solid #ddd",
            height: "100%"
          }}
        >
          <div>{this.listAllNotes()}</div>
        </nav>
      );
    } else {
      return (
        <nav
          style={{
            borderRight: "1px solid #ddd",
            borderBottom: "1px solid #ddd",
            height: "100%"
          }}
        >
          <span
            style={{
              padding: "20px",
              textAlign: "center"
            }}
          >
            <h4>No notes yet...</h4>
          </span>
        </nav>
      );
    }
  }
}

function mapStateToProps(state, props) {
  return {
    notes: state.notes.allNotes
  };
}

export default connect(mapStateToProps)(NoteListContainer);
