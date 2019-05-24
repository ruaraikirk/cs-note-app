import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'

class NoteListItem extends React.Component {
  render() {
    return(
      <div id={this.props.note.id} key={this.props.note.id} onClick={this.props.selectNote}>
        {this.props.note.title}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    notes: state.notes.allNotes,
  }
}

export default connect(mapStateToProps)(NoteListItem)
