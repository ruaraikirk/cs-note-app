import React from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  bindActionCreators
} from "draft-js";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { createNote, updateNote } from "../actions/index";

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }

  componentDidMount() {
    console.log("NoteEditor - componentDidMount() called...");
    let displayedNote = this.props.displayedNote;
    if (typeof displayedNote == "object") {
      this.setState({
        editorState: EditorState.createWithContent(
          this.props.displayedNote.contentState
        )
      });
    } else {
      this.setState({
        noteTitle: "",
        editorState: EditorState.createEmpty()
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("NoteEditor - componentDidUpdate() called...");
    console.log("prevProps.displayedNote: ", prevProps.displayedNote);
    console.log("this.props.displayedNote: ", this.props.displayedNote);
    if (prevProps.displayedNote != this.props.displayedNote) {
      let displayedNote = this.props.displayedNote;
      if (typeof displayedNote == "object") {
        let contentState = displayedNote.contentState;
        let persistedTitle = displayedNote.title;
        this.setState({
          editorState: EditorState.createWithContent(contentState),
          noteTitle: persistedTitle
        });
      } else {
        this.setState({
          noteTitle: "",
          editorState: EditorState.createEmpty()
        });
      }
    }
  }

  submitEditor = () => {
    console.log("NoteEditor - submitEditor() called...");
    let displayedNote = this.props.displayedNote;
    if (typeof displayedNote == "object") {
      let id = this.props.displayedNote.id;
      let title = this.state.noteTitle;
      let contentState = this.state.editorState.getCurrentContent();
      console.log("NoteEditor - updateNote()");
      this.props.updateNote({ id, title, contentState });
      /*this.setState({
        noteTitle: "",
        editorState: EditorState.createEmpty()
      });*/
    } else {
      let id = uuidv1();
      let title = this.state.noteTitle;
      let contentState = this.state.editorState.getCurrentContent();
      console.log("NoteEditor - createNote()");
      this.props.createNote({ id, title, contentState });
      this.setState({
        noteTitle: "",
        editorState: EditorState.createEmpty()
      });
    }
  };

  captureTitle = event => {
    event.preventDefault();
    let value = event.target.value;
    this.setState({
      noteTitle: value
    });
  };

  /*createNewNote = () => {
    console.log("NoteEditor - createNewNote() called...");
  };*/

  render() {
    return (
      <div>
        {/*<div>
          <button onClick={this.createNewNote}>Create New</button>
        </div>*/}
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
    notes: state.notes.allNotes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createNote: note => dispatch(createNote(note)),
    updateNote: note => dispatch(updateNote(note))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEditor);
