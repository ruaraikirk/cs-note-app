import React from "react";
import logo from "./logo.svg";
import "./App.css";

import NoteEditor from "./components/NoteEditor";
import NoteListContainer from "./components/noteList/NoteListContainer";

class App extends React.Component {
  render() {
    return (
      <div>
        CS NOTES
        <div>
          <NoteEditor />
        </div>
        <div>
          <p>NOTE LIST CONTAINER</p>
          <NoteListContainer />
        </div>
      </div>
    );
  }
}

export default App;