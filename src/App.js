import React from "react";
import "./App.css";

import NoteEditor from "./components/NoteEditor";
import NoteListContainer from "./components/noteList/NoteListContainer";

import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedNote: "new"
    };
  }

  componentDidMount() {
    this.setState({
      displayedNote: "new"
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.notes.length != this.props.notes.length) {
      this.setState({
        displayedNote: "new"
      });
    }
  }

  selectNote = event => {
    let target_id = event.target.id;
    let selected = "";
    if (target_id != "new") {
      selected = this.props.notes.find(note => {
        return note.id === target_id;
      });
    } else {
      selected = "new";
    }
    this.setState({
      displayedNote: selected
    });
  };

  createNewNote = () => {
    this.setState({
      displayedNote: "new"
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-container">
          <header className="App-header">
            <h2>🗒️ CS NOTE APP</h2>
            <button onClick={this.createNewNote} style={{float:"right", cursor: 'pointer'}}>Create New</button>
          </header>
          <section className="App-body">
            <div className="App-list">
              <NoteListContainer selectNote={this.selectNote} />
            </div>
            <div className="App-editor">
              <NoteEditor displayedNote={this.state.displayedNote} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    notes: state.notes.allNotes,
    displayedNote: state.notes.displayedNote
  };
}

export default connect(mapStateToProps)(App);
