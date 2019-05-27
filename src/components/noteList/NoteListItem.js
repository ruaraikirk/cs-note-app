import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";

class NoteListItem extends React.Component {
  render() {
    return (
      <nav
        style={{
          width: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <div
          id={this.props.note.id}
          key={this.props.note.id}
          onClick={this.props.selectNote}
          style={{
            float: 'left',
            clear: 'both',
            position: 'relative',
            fontSize: 18,
            height: 45,
            lineHeight: '45px',
            whiteSpace: 'nowrap',
            borderBottom: '1px solid #ddd',
            width: '100%',
            ':hover': {
              boxShadow: '0 0 22px 0 rgba(0, 0, 0, 0.10)'
            }
          }}
        >
          {this.props.note.title}
        </div>
        <div
          style={{
            fontSize: 18,
            height: 45,
            lineHeight: '45px',
            whiteSpace: 'nowrap',
            borderBottom: '1px solid #ddd',
            paddingRight:'2px'
          }}
        >></div>
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
