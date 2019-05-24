import React from "react";
import { Editor, EditorState, convertToRaw, bindActionCreators} from "draft-js";
import { connect } from "react-redux";
import uuidv1 from "uuid";
//import createNote from "../actions/index";
//import * as Actions from "../actions/index";
import { createNote, updateNote } from "../actions/index"

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }

  componentDidMount() {
    let displayedNote = this.props.displayedNote
    if (typeof displayedNote == "object") {
      this.setState({
        editorState: EditorState.createWithContent(this.props.displayedNote.contentState)
      })
    } else {
      console.log("New note being created")
      this.setState({
        noteTitle: "",
        editorState: EditorState.createEmpty()
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.displayedNote != this.props.displayedNote) {
      let displayedNote = this.props.displayedNote
      console.log("componentDidUpdate - displatedNote: ", displayedNote)
      if (typeof displayedNote == "object") {
        let contentState = displayedNote.contentState
        let persistedTitle = displayedNote.title
        this.setState({
          editorState: EditorState.createWithContent(contentState),
          noteTitle: persistedTitle
        })
      } else {
        this.setState({
          noteTitle: "",
          editorState: EditorState.createEmpty()
        })
      }
    }
  }

  submitEditor = () => {
    let displayedNote = this.props.displayedNote
    console.log("State :", this.state)
    console.log("disp[layedNote: ",displayedNote)
    if (typeof displayedNote == "object") {
      let id = this.props.displayedNote.id;
      let title = this.state.noteTitle;
      let contentState = this.state.editorState.getCurrentContent();
      this.props.updateNote({ id, title, contentState });
      /*this.setState({
        noteTitle: "",
        editorState: EditorState.createEmpty()
      });*/
    } else {
      let id =  uuidv1();
      let title = this.state.noteTitle;
      let contentState = this.state.editorState.getCurrentContent();
      this.props.createNote({ id, title, contentState });
      this.setState({
        noteTitle: "",
        editorState: EditorState.createEmpty()
      });
    }
    /*let displayedNote = this.props.displayedNote
    console.log("displayedNote: ", displayedNote)
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
      //this.props.createNote(note);
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

  createNewNote = () => {
    console.log("Create new note function called")
	}

  render() {
    return (
      <div>
        <div>
					<button onClick={this.createNewNote}>Create New</button>
				</div>
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


/*
function mapDispatchToProps(dispatch) {
  return {
    createNote: note => dispatch(createNote(note))
  };
}

export default connect(null, mapDispatchToProps)(NoteEditor)
*/
function mapStateToProps(state, props) {
  return {
    notes: state.notes.allNotes,
  }
}

/*function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}*/

function mapDispatchToProps(dispatch) {
  return {
    createNote: note => dispatch(createNote(note)),
    updateNote: note => dispatch(updateNote(note))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor)