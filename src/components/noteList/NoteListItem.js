import React from "react";
import { connect } from "react-redux";

class NoteListItem extends React.Component {
  render() {
    return (
      <nav>
        <div
          id={this.props.note.id}
          key={this.props.note.id}
          onClick={this.props.selectNote}
          style={{
            float: "left",
            clear: "both",
            position: "relative",
            fontSize: 18,
            height: 45,
            lineHeight: "45px",
            whiteSpace: "nowrap",
            borderBottom: "1px solid #ddd",
            width: "100%",
            cursor: "pointer",
            // on hover shadow not working...
            padding: 0,
            boxShadow: "none",
            transition: "all 0.3s",
            ":hover": {
              boxShadow: "0 0 22px 0 rgba(0, 0, 0, 0.10)"
            }
          }}
        >
          {this.props.note.title}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    notes: state.notes.allNotes
  };
}

export default connect(mapStateToProps)(NoteListItem);
