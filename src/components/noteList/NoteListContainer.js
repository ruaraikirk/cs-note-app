import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";
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
        <div>
          <span>
            <h3>All Notes</h3>
          </span>

          <div>{this.listAllNotes()}</div>
        </div>
      );
    } else {
      return <div>No Notes Saved Yet</div>;
    }
  }
}

function mapStateToProps(state, props) {
  return {
    notes: state.notes.allNotes
  };
}

export default connect(mapStateToProps)(NoteListContainer);
