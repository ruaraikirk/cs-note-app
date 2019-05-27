import React from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, convertToRaw } from "draft-js";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { createNote, updateNote } from "../actions/index";
import "./RichEditor.css";
import Button from 'react-bootstrap/Button';

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
    // Styling
    this.focus = () => this.editor.focus();
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  componentDidMount() {
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
    let title = this.state.noteTitle;
    let contentState = this.state.editorState.getCurrentContent();
    let content = convertToRaw(contentState);
    if (this.state.noteTitle == "" || (content.blocks.length <= 1 && content.blocks[0].depth === 0 && content.blocks[0].text == "")) {
      alert("Note cannot be saved if title or content is blank")
    } else {
      if (typeof displayedNote == "object") {
        let id = this.props.displayedNote.id;
        console.log("NoteEditor - updateNote()");
        this.props.updateNote({ id, title, contentState });
      } else {
        let id = uuidv1();
        console.log("NoteEditor - createNote()");
        this.props.createNote({ id, title, contentState });
        this.setState({
          noteTitle: "",
          editorState: EditorState.createEmpty()
        });
      }
    }
  };

  captureTitle = event => {
    event.preventDefault();
    let value = event.target.value;
    this.setState({
      noteTitle: value
    });
  };

  // Styling
  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  _mapKeyToEditorCommand(e) {
    switch (e.keyCode) {
      case 9: // TAB
        const newEditorState = RichUtils.onTab(
          e,
          this.state.editorState,
          4 /* maxDepth */
        );
        if (newEditorState !== this.state.editorState) {
          this.onChange(newEditorState);
        }
        return;
    }
    return getDefaultKeyBinding(e);
  }
  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }
    return (
      <div>
        <span>
          <input
            className="TitleInput"
            type="text"
            placeholder="Title..."
            name="noteTitle"
            value={this.state.noteTitle}
            onChange={this.captureTitle}
          />
        </span>
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              //placeholder="Tell a story..."
              ref={ref => (this.editor = ref)}
              spellCheck={true}
            />
          </div>
          <Button 
            variant="primary" 
            onClick={this.submitEditor}
            style={{position: 'fixed', bottom: '40px', right: '40px', cursor: 'pointer'}}
            //disabled={this.state.isDisabled}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];
const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];
const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

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
