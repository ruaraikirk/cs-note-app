import React from "react";
import { Editor, EditorState, convertToRaw, bindActionCreators} from "draft-js";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import * as Actions from "../actions/index";

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }

  submitEditor = () => {
    let id = uuidv1();
    let title = this.state.noteTitle;
    let contentState = this.state.editorState.getCurrentContent();
    let note = {
      id: id,
      title: this.state.noteTitle,
      content: convertToRaw(contentState)
    };
    if (
      this.state.noteTitle == "" ||
      (note.content.blocks.length <= 1 &&
        note.content.blocks[0].depth === 0 &&
        note.content.blocks[0].text == "")
    ) {
      alert("Note cannot be saved if title or content is blank");
    } else {
      this.props.createNote({ id, title, contentState });
      this.setState({
        noteTitle: "",
        editorState: EditorState.createEmpty()
      });
    }
    /*this.props.createNote({ id, title, contentState });
        this.setState({
            noteTitle: "",
            editorState: EditorState.createEmpty()
        })*/
  };

  captureTitle = event => {
    event.preventDefault();
    let value = event.target.value;
    this.setState({
      noteTitle: value
    });
  };

  render() {
    return (
      <div>
        <span>
          <input
            type="text"
            placeholder="Title..."
            name="noteTitle"
            value={this.state.noteTitle}
            onChange={this.captureTitle}
          />
        </span>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />

        <button onClick={this.submitEditor} style={{ float: "right" }}>
          SAVE
        </button>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    notes: state.notes.allNotes,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor)
