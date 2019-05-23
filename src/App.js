import React from "react";
import logo from "./logo.svg";
import "./App.css";

import NoteEditor from "./components/NoteEditor";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../src/actions'

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

//export default App;
function mapStateToProps(state, props) {
  return {
    notes: state.notes.allNotes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)