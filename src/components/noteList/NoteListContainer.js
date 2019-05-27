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
        <nav
          style={{
            display: 'flex',
            position: 'fixed',
            flexDirection: 'column',
            height: '100vh',
            width: '260px',
            borderRight: '1px solid #ddd',
            marginRight: '10px'
          }}
        >
          <div>
          {this.listAllNotes()}
          </div>
        </nav>
      );
    } else {
      return (
        <nav
        style={{
          display: 'flex',
          position: 'fixed',
          flexDirection: 'column',
          height: '100vh',
          width: '260px',
          borderRight: '1px solid #ddd',
          marginRight: '10px'
        }}
        >
          <span>
            <h3>No notes yet...</h3>
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
