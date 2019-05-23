import React from "react";
import logo from "./logo.svg";
import "./App.css";

import NoteEditor from "./components/NoteEditor";

class App extends React.Component {
  render() {
    return (
      <div>
        CS NOTES
        <div>
          <NoteEditor />
        </div>
      </div>
    );
  }
}

export default App;